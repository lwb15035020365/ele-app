<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="my logo image" />
    </div>
    <!-- 手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码 -->
    <InputGroup type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code" />
    <!--用户服务协议 -->
    <div class="login_des">
      新用户登录即自动登录，表示以同意
      <span>《用户服务协议》</span>
    </div>

    <div class="login_btn">
      <button :disabled="isClick" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/inputGroup";
export default {
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  computed: {
    isClick() {
      if(!this.phone || !this.verifyCode)return true;
      else return false;
    }
  },
  methods: {
    login() {
      //取消错误提醒
      this.errors = {};
      this.$axios.post('/api/posts/sms_back', {
        phone: this.phone,
        code: this.verifyCode
      }).then(res => {
        // console.log(res)
        localStorage.setItem('ele_login', res.data.user._id);
        this.$router.push('/')
      }).catch(err => {
        // console.log(err.response);
        this.errors = {
          code: err.response.data.msg
        }
      })
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        //发送请求
        this.$axios.post('/api/posts/sms_send', {
          phone: this.phone
        });
        this.validateBtn();
      }
    },

    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          //倒计时
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },

    validatePhone() {
      //验证手机号
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    }
  },

  components: {
    InputGroup
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
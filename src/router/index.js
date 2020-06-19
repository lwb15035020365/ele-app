import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import('../views/index'),
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/Home')
    }, {
      path: '/me',
      name: 'me',
      component: () => import('../views/Me')
    }, {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order')
    }, {
      path: '/address',
      name: 'address',
      component: () => import('../views/Address')
    }, {
      path: '/city',
      name: 'city',
      component: () => import('../views/City')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search')
  },
  {
    path: '/shop',
    name: 'shop',
    redirect: '/goods',
    component: () => import('../views/Shops/Shop'),
    children: [{
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Shops/Goods.vue')
      },
      {
        path: '/comments',
        name: 'comments',
        component: () => import('../views/Shops/Comments.vue')
      },
      {
        path: '/seller',
        name: 'seller',
        component: () => import('../views/Shops/Seller.vue')
      }
    ]
  },
  {
    path: '/myAddress',
    name: 'myAddress',
    component: () => import('../views/Orders/MyAddress')
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('../views/Orders/AddAddress')
  },
  {
    path: '/settlement',
    name: 'settlement',
    component: () => import('../views/Orders/Settlement')
  },{
    path: '/remark',
    name: 'remark',
    component: () => import('../views/Orders/Remark')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/Orders/Pay')
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('../views/Orders/OrderInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    //是否在登录状态下
    isLogin ? next() : next('/login')
  }
})

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('../views/Log.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/account/',
    name: 'Account',
    component: () => import('../views/Account/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'AccountHome',
        component: () => import('../views/Account/Home.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'infomodify',
        name: 'UserInfoModify',
        component: () => import('../views/Account/InfoModify.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'passwordmodify',
        name: 'UserPasswordModify',
        component: () => import('../views/Account/PasswordModify.vue'),
        meta: { requiresAuth: true },
      }
    ]
  },
  {
    path: '/character/:page?',
    name: 'Character',
    component: () => import('../views/Character/Index.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/group/',
    name: 'Group',
    component: () => import('../views/Group/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'create',
        name: 'GroupCreate',
        component: () => import('../views/Group/Create.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'search/:keyword?/:page?',
        name: 'GroupSearch',
        component: () => import('../views/Group/Search.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: ':page?',
        name: 'GroupHome',
        component: () => import('../views/Group/Home.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/groupview/:id/',
    name: 'GroupView',
    component: () => import('../views/GroupView/Index.vue'),
    props: true,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'GroupViewHome',
        component: () => import('../views/GroupView/Home.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'member',
        name: 'GroupViewMember',
        component: () => import('../views/GroupView/Member.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'character',
        name: 'GroupViewCharacter',
        component: () => import('../views/GroupView/Character.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'setting',
        name: 'GroupViewSetting',
        component: () => import('../views/GroupView/Setting.vue'),
        props: true,
        meta: { requiresAuth: true },
      }
    ]
  },
  {
    path: '/setting/',
    name: 'Setting',
    component: () => import('../views/Setting/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'SettingHome',
        component: () => import('../views/Setting/Home.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'buffer',
        name: 'SettingBuffer',
        component: () => import('../views/Setting/Buffer.vue'),
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: '/document/',
    name: 'Document',
    component: () => import('../views/Document/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'DocumentHome',
        component: () => import('../views/Document/Home.vue'),
      },
      {
        path: 'group',
        name: 'DocumentGroup',
        component: () => import('../views/Document/Group.vue'),
      },
      {
        path: 'groupview',
        name: 'DocumentGroupView',
        component: () => import('../views/Document/GroupView.vue'),
      },
      {
        path: 'character',
        name: 'DocumentCharacter',
        component: () => import('../views/Document/Character.vue'),
      },
      {
        path: 'account',
        name: 'DocumentAccount',
        component: () => import('../views/Document/Account.vue'),
      },
      {
        path: 'setting',
        name: 'DocumentSetting',
        component: () => import('../views/Document/Setting.vue'),
      },
      {
        path: 'log',
        name: 'DocumentLog',
        component: () => import('../views/Document/Log.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('isLogin')) {
    Message({
      showClose: true,
      type: "error",
      message: "请先登录"
    })
    next('/login')
  }
  else next()
})

export default router

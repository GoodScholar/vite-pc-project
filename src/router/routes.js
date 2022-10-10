const routes = [
  { path: '/', redirect: { name: 'Test' } },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/homeView.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/TestItem.vue'),
    meta: {
      title: '测试',
    },
  },
]

export default routes

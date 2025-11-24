import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/wall-msg',
    name: 'index',
    component: () => import('@/views/YileIndex.vue'),
    children: [
      {
        path: '/wall-msg',
        component: () => import('@/views/WallMsg.vue'),
      },
      {
        path: '/wall-pic',
        component: () => import('@/views/WallPic.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

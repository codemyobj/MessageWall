import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/wall?id=0',
    name: 'index',
    component: () => import('@/views/YileIndex.vue'),
    children: [
      {
        path: '/wall',
        component: () => import('@/views/WallMsg.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/wall',
    name: 'index',
    component: () => import('@/views/YileIndex.vue'),
    children: [
      {
        path: '/wall',
        component: () => import('@/views/WallMessage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

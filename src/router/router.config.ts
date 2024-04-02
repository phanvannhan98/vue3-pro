import { RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  export interface RouteMeta {
    icon?: TIcon;
  }
}

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'app',
    component: () => import('@/layouts/main-layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        redirect: { name: 'my-tasks' },
        meta: {
          title: 'title.dashboard',
        },
        children: [
          {
            path: 'discussion',
            name: 'discussion',
            component: () => import('@/views/dashboard/discussion/index.vue'),
            meta: {
              title: 'title.discussion',
            },
          },
          {
            path: 'my-tasks',
            name: 'my-tasks',
            component: () => import('@/views/dashboard/my-tasks/index.vue'),
            meta: {
              title: 'title.my-tasks',
            },
          },
          {
            path: 'tasks',
            name: 'tasks',
            component: () => import('@/views/dashboard/tasks/index.vue'),
            meta: {
              title: 'title.tasks',
            },
          },
          {
            path: 'files',
            name: 'files',
            component: () => import('@/views/dashboard/files/index.vue'),
            meta: {
              title: 'title.files',
            },
          },
          {
            path: 'overview',
            name: 'overview',
            component: () => import('@/views/dashboard/overview/index.vue'),
            meta: {
              title: 'title.overview',
            },
          },
        ],
      },
      {
        path: '/timelines',
        name: 'timelines',
        component: () => import('@/views/timelines/index.vue'),
        meta: {
          title: 'title.timelines',
        },
      },
      {
        path: '/calendars',
        name: 'calendars',
        component: () => import('@/views/calendars/index.vue'),
        meta: {
          title: 'title.calendars',
        },
      },
      {
        path: '/chats',
        name: 'chats',
        component: () => import('@/views/chats/index.vue'),
        meta: {
          title: 'title.chats',
        },
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/index.vue'),
        meta: {
          title: 'title.users',
        },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
          title: 'title.settings',
        },
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('@/views/notifications/index.vue'),
        meta: {
          title: 'title.notifications',
        },
      },
    ],
  },
];

export const publicRoutes = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: 'title.notFound',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: 'title.login',
    },
  },
];

const constantRoutes: RouteRecordRaw[] = [
  ...accessRoutes,
  ...publicRoutes,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

export default constantRoutes;

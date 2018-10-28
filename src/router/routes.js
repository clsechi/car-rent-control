
const routes = [
  {
    path: '/login',
    component: () => import('layouts/login.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/login/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'summary',
        component: () => import('pages/summary/index.vue'),
      },
    ],
  },
  {
    path: '/registros',
    component: () => import('layouts/records.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'records', component: () => import('pages/records/index.vue') },
    ],
  },
  {
    path: '/registros/novo',
    name: 'new',
    component: () => import('pages/records/new.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/registros/:id',
    name: 'edit',
    component: () => import('pages/records/edit.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/configuracoes',
    component: () => import('layouts/settings.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('pages/settings/index.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue'),
  });
}

export default routes;

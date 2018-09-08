
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
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
    children: [
      { path: '', name: 'records', component: () => import('pages/records/index.vue') },
    ],
  },
  {
    path: '/registros/novo',
    name: 'new',
    component: () => import('pages/records/new.vue'),
  },
  {
    path: '/registros/:id',
    name: 'edit',
    component: () => import('pages/records/edit.vue'),
  },
  {
    path: '/configuracoes',
    component: () => import('layouts/settings.vue'),
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

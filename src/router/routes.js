
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', name: 'summary', component: () => import('pages/summary/index.vue') },
      { path: '/configuracoes', name: 'settings', component: () => import('pages/settings/index.vue') },
      { path: '/records', name: 'records', component: () => import('pages/records/index.vue') },
      { path: '/records/novo', name: 'new', component: () => import('pages/records/new.vue') },
      { path: '/records/:id', name: 'edit', component: () => import('pages/records/edit.vue') },
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


const routes = [
  {
    path: '/',
    component: () => import('layouts/public.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/home/index.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/login/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/private.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'resumo',
        name: 'summary',
        component: () => import('pages/summary/index.vue'),
        meta: {
          toolbar: {
            title: 'Sua Semana',
            button: 'menu',
          },
        },
      },
      {
        path: 'perfil',
        name: 'profile',
        component: () => import('pages/profile/index.vue'),
        meta: {
          toolbar: {
            title: 'Seu Perfil',
            button: 'menu',
          },
        },
      },
      {
        path: 'registros',
        name: 'records',
        component: () => import('pages/records/index.vue'),
        meta: {
          toolbar: {
            title: 'Registros',
            button: 'menu',
          },
        },
      },
      {
        path: 'registros/novo',
        name: 'new',
        component: () => import('pages/records/new.vue'),
        meta: {
          toolbar: {
            title: 'Novo Registro',
            button: 'back',
          },
        },
      },
      {
        path: 'registros/:id',
        name: 'edit',
        component: () => import('pages/records/edit.vue'),
        meta: {
          toolbar: {
            title: 'Editar Registro',
            button: 'back',
          },
        },
      },
      {
        path: 'configuracoes',
        name: 'settings',
        component: () => import('pages/settings/index.vue'),
        meta: {
          toolbar: {
            title: 'Configurações',
            button: 'back',
          },
        },
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

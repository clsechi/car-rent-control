
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
        path: 'summary',
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
        path: 'profile',
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
        path: 'records',
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
        path: 'records/incomes/new',
        name: 'newIncome',
        component: () => import('pages/records/new.vue'),
        meta: {
          toolbar: {
            title: 'Ganho',
            button: 'back',
          },
          componentPrefix: 'income',
        },
      },
      {
        path: 'records/incomes/:id',
        name: 'editIncome',
        component: () => import('pages/records/edit.vue'),
        meta: {
          toolbar: {
            title: 'Ganho',
            button: 'back',
          },
          componentPrefix: 'income',
        },
      },
      {
        path: 'records/expenses/new',
        name: 'newExpense',
        component: () => import('pages/records/new.vue'),
        meta: {
          toolbar: {
            title: 'Despesas',
            button: 'back',
          },
          componentPrefix: 'expense',
        },
      },
      {
        path: 'records/expenses/:id',
        name: 'editExpense',
        component: () => import('pages/records/edit.vue'),
        meta: {
          toolbar: {
            title: 'Despesas',
            button: 'back',
          },
          componentPrefix: 'expense',
        },
      },
      {
        path: 'records/refueling/new',
        name: 'newRefueling',
        component: () => import('pages/records/new.vue'),
        meta: {
          toolbar: {
            title: 'Abastecimento',
            button: 'back',
          },
          componentPrefix: 'refueling',
        },
      },
      {
        path: 'records/refueling/:id',
        name: 'editRefueling',
        component: () => import('pages/records/edit.vue'),
        meta: {
          toolbar: {
            title: 'Abastecimento',
            button: 'back',
          },
          componentPrefix: 'refueling',
        },
      },
      {
        path: 'records/maintenance/new',
        name: 'newMaintenance',
        component: () => import('pages/records/new.vue'),
        meta: {
          toolbar: {
            title: 'Manutenção',
            button: 'back',
          },
          componentPrefix: 'maintenance',
        },
      },
      {
        path: 'records/maintenance/:id',
        name: 'editMaintenance',
        component: () => import('pages/records/edit.vue'),
        meta: {
          toolbar: {
            title: 'Manutenção',
            button: 'back',
          },
          componentPrefix: 'maintenance',
        },
      },
      {
        path: 'settings',
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

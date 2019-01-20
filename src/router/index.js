import Vue from 'vue';
import VueRouter from 'vue-router';
import { Loading } from 'quasar';

import store from '../store';
import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const Router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
});

const hasUid = () => store.getters['user/uid'];

const getSettings = async () => {
  if (!store.getters['user/settingsCompleted']) {
    Loading.show({
      message: 'Carregando...',
      customClass: 'bg-primary',
    });

    await store.dispatch('user/getSettings');

    if (!store.getters['user/settingsCompleted']) {
      Vue.$log.debug('Incompleted profile!');
      return true;
    }
  }
  return false;
};

const toProfile = records => records.some(record => record.name === 'profile');

const toHome = records => records.some(record => record.name === 'home');

Router.beforeEach((to, from, next) => {
  Vue.prototype.$firebase.auth().onAuthStateChanged(async (currentUser) => {
    Vue.$log.debug('CurrentUser', currentUser);

    if (currentUser && !hasUid()) store.commit('user/setData', currentUser);

    if (currentUser && toHome(to.matched)) {
      next({ name: 'summary' });
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
      const incompleteSettings = await getSettings();

      if (!currentUser) {
        next({
          name: 'login',
          query: { redirect: to.fullPath },
        });
      }

      if (incompleteSettings && !toProfile(to.matched)) {
        next({
          name: 'profile',
          query: { incomplete: true },
        });
      }
    }
    next(); // make sure to always call next()!
  });
});

export default Router;

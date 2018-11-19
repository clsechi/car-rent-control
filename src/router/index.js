import Vue from 'vue';
import VueRouter from 'vue-router';

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

Router.beforeEach((to, from, next) => {
  Vue.prototype.$firebase.auth().onAuthStateChanged((currentUser) => {
    Vue.$log.debug('CurrentUser', currentUser);

    store.commit('user/setData', currentUser);

    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!currentUser) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });
});

export default Router;

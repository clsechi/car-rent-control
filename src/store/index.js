import Vue from 'vue';
import Vuex from 'vuex';

import record from './record';
import user from './user';
import status from './status';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      record,
      user,
      status,
    },
    // strict: process.env.NODE_ENV !== 'production',
  });

  return Store;
}

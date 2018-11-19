<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          text-color="white"
          size="15px"
          round
          dense
          flat
          no-ripple
          @click="$router.push('/')"
        />
        <q-toolbar-title>
          Registros
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view/>

      <q-inner-loading :visible="loading">
        <q-spinner size="50px" color="primary"></q-spinner>
      </q-inner-loading>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // name: 'LayoutName',

  preFetch({ store, redirect }) {
    store.state.$firebase.auth().onAuthStateChanged((user) => {
      console.log('state changed', user);
      if (!user) return redirect('/login');

      store.commit('user/setData', Object.assign({}, user));
      return store.dispatch('record/getRecords', user.uid);
    });
  },

  data() {
    return {
      open: true,
      loading: false,
    };
  },

  computed: {
    ...mapGetters('record', ['records']),
  },

  methods: {
    ...mapActions('record', [
      'getRecords',
    ]),
  },
};
</script>

<style>
</style>

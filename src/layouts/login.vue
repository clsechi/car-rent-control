<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  preFetch({ store, redirect }) {
    store.state.$firebase.auth().onAuthStateChanged((user) => {
      if (!user) redirect('/login');
    });
  },
};
</script>

<style>
</style>

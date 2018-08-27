<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
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
        <q-toolbar-title class="text-center">
          Controle de Aluguel
        </q-toolbar-title>
        <span class="text-right">
          JP
        </span>
      </q-toolbar>
      <q-tabs
        animated
        align="center"
      >
        <q-route-tab
          slot="title"
          :to="{ name: 'summary'}"
          icon="dashboard"
        />
        <q-route-tab
          slot="title"
          :to="{ name: 'records'}"
          icon="list"
        />
        <q-route-tab
          slot="title"
          :to="{ name: 'settings'}"
          icon="settings"
        />
      </q-tabs>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'default',

  methods: {
    ...mapActions('record', [
      'getRecords',
    ]),

    ...mapActions('user', [
      'getUser',
    ]),
  },

  created() {
    this.getUser('jp@email.com');
    this.getRecords('jp@email.com');
  },
};
</script>

<style>
</style>

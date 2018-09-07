<template>
  <q-layout view="hhh Lpr fFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Sua semana
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
    >
      <div class="row flex items-end menu text-weight-medium" style="height: 23%">
        <div class="col-12">
          <img
            src="https://api.adorable.io/avatars/285/jp@email.com.png"
            alt="avatar"
            width="60px"
            class="avatar"
          >
        </div>
        <div class="col-12">
          João Paulo
        </div>
        <div class="col-12">
          jp@email.com
        </div>
      </div>
      <q-list highlight>
        <q-item :to="{ name: 'summary'}">
          <q-item-side icon="dashboard"/>
          <q-item-main label="Sua Semana"/>
        </q-item>
        <q-item :to="{ name: 'records'}">
          <q-item-side icon="list"/>
          <q-item-main label="Registros"/>
        </q-item>
        <q-item :to="{ name: 'settings'}">
          <q-item-side icon="settings"/>
          <q-item-main label="Configurações"/>
        </q-item>
        <q-item class="fixed-bottom" sparse>
          <q-item-side icon="exit_to_app"/>
          <q-item-main label="Sair"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'default',

  data() {
    return {
      leftDrawer: true,
    };
  },

  methods: {
    ...mapActions('record', [
      'getRecords',
    ]),

    ...mapActions('user', [
      'getUser',
    ]),
  },

  async created() {
    await this.getUser('jp@email.com');
    await this.getRecords('jp@email.com');
  },
};
</script>

<style scoped>
.menu {
  background-image: url('../assets/bg.jpeg');
  padding: 15px;
}
.avatar {
  border-radius: 100%
}
</style>

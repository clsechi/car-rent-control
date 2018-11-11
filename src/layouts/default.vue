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
          @click="open = !open"
        />
        <q-toolbar-title>
          Sua semana
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="open"
    >
      <div class="row menu text-weight-medium">
        <div class="col-12">
          <img
            src="https://api.adorable.io/avatars/285/jp@email.com"
            alt="avatar"
            class="avatar q-mb-md"
          >
        </div>
        <div class="col-12">
          <span class="q-title capitalize block">{{ this.profile.displayName }}</span>
        <small class="q-caption">{{ this.profile.email }}</small>
        </div>
      </div>
      <q-list highligth link>
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
        <q-item class="fixed-bottom" sparse @click.native="signOut">
          <q-item-side icon="exit_to_app"/>
          <q-item-main label="Sair"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />

      <q-inner-loading :visible="loading">
        <q-spinner size="50px" color="primary"></q-spinner>
      </q-inner-loading>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'default',

  data() {
    return {
      open: true,
      loading: true,
    };
  },

  methods: {
    ...mapActions('record', [
      'getWeekRecords',
    ]),

    signOut() {
      this.$firebase.auth().signOut();
      this.$router.push('/login');
    },
  },

  computed: {
    ...mapGetters('record', ['weekRecords']),

    ...mapGetters('user', [
      'profile',
    ]),
  },

  async created() {
    await this.getWeekRecords();
    this.loading = false;
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

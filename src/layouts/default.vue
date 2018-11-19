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
            :src="avatarSrc"
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
import { mapGetters } from 'vuex';

export default {
  name: 'default',

  preFetch({ store, redirect }) {
    // return store.state.$firebase.auth().onAuthStateChanged((user) => {
    //   console.log('state changed', user);
    //   if (!user) redirect('/login');
    //   // return store.dispatch('user/updateProfile', user);
    // });
    store.state.$firebase.auth().onAuthStateChanged((user) => {
      console.log('state changed', user);
      if (!user) return redirect('/login');

      store.commit('user/setData', Object.assign({}, user));
      return store.dispatch('user/getSettings', user.uid);
    });
    // store.commit('user/setData', currentUser);
  },

  data() {
    return {
      open: true,
    };
  },

  methods: {
    signOut() {
      this.$store.state.$firebase.auth().signOut();
      this.$router.push('/login');
    },
  },

  computed: {
    ...mapGetters('record', ['weekRecords']),

    ...mapGetters('user', [
      'profile',
      'uid',
    ]),

    avatarSrc() {
      if (this.profile.photoURL) return this.profile.photoURL;
      return `https://api.adorable.io/avatars/285/${this.profile.email}`;
    },

    loading() {
      return Boolean(!this.uid);
    },
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

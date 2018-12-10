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
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Loading } from 'quasar';

export default {
  name: 'default',

  preFetch({ store }) {
    if (!store.getters['user/rental']) {
      Loading.show({
        message: 'Carregando...',
        customClass: 'bg-primary',
      });
      return store.dispatch('user/getSettings');
    }
    return false;
  },

  data() {
    return {
      open: true,
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

    avatarSrc() {
      if (this.profile.photoURL) return this.profile.photoURL;
      return `https://api.adorable.io/avatars/285/${this.profile.email}`;
    },
  },

  async created() {
    await this.getWeekRecords();
    Loading.hide();
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

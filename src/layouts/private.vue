<template>
  <q-layout view="hhh Lpr fFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <component
          :is="toolbarButton"
          :open.sync="openMenu"
        />
        <q-toolbar-title>
          {{ toolbarTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="openMenu" side="left">
      <div class="row menu text-weight-medium">
        <div class="col-12">
          <img
            :src="avatarSrc"
            alt="avatar"
            class="avatar q-mb-md"
          />
        </div>
        <div class="col-12">
          <span class="q-title capitalize block">{{ profile.displayName }}</span>
          <small class="q-caption">{{ profile.email }}</small>
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
        <q-item
          class="fixed-bottom"
          sparse
          @click.native="signOut">
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
import menuButton from '../components/menuButton';
import backButton from '../components/backButton';

export default {
  name: 'default',

  components: {
    menuButton,
    backButton,
  },

  data() {
    return {
      openMenu: true,
    };
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

    toolbarTitle() {
      return this.$route.meta.toolbar.title;
    },

    toolbarButton() {
      return `${this.$route.meta.toolbar.button}Button`;
    },
  },

  async created() {
    await this.getWeekRecords();
    Loading.hide();
  },

  methods: {
    ...mapActions('record', [
      'getWeekRecords',
    ]),

    signOut() {
      this.$firebase.auth().signOut();
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.menu  {
  background-image: url('../assets/bg.jpeg');
  padding: 15px;
}
.avatar {
  border-radius: 100%
}
</style>

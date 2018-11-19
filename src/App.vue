<template>
  <div id="q-app">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="offline text-center text-weight-medium bg-tertiary q-pb-xs" v-if="offline">
        <small>Sem conexão com a Internet</small>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  preFetch({ store }) {
    // TODO: SET PRODUCTION CONFIG WHEN CI PUSHES TO PRODUCTION
    // const config = (process.env.DEV) ? configs.dev : configs.prod;
    const config = {
      apiKey: 'AIzaSyDz7HEWdU8GHO70NbGmH2DZfvyaGEzITYQ',
      authDomain: 'car-rent-control.firebaseapp.com',
      databaseURL: 'https://car-rent-control.firebaseio.com',
      projectId: 'car-rent-control',
      storageBucket: 'car-rent-control.appspot.com',
      messagingSenderId: '64153021131',
    };

    firebase.initializeApp(config);

    firebase.firestore().settings({ timestampsInSnapshots: true });
    firebase.firestore().enablePersistence();

    const DB = firebase.firestore();

    const AUTH_UI = new firebaseui.auth.AuthUI(firebase.auth());

    Object.assign(store.state, {
      $authUI: AUTH_UI,
      $firestore: DB,
      $firebase: firebase,
    });
  },

  data() {
    return {
      offline: false,
    };
  },

  created() {
    this.updateStatus();
    this.addEventHandlers();
  },

  methods: {
    ...mapActions('user', [
      'getSettings',
    ]),

    updateStatus() {
      this.offline = !navigator.onLine;
    },

    async loadSettings(uid) {
      try {
        await this.getSettings(uid);
      } catch (err) {
        this.$log.error('loadSettings', err);
      }
    },

    addEventHandlers() {
      window.addEventListener('online', this.updateStatus);
      window.addEventListener('offline', this.updateStatus);

      // this.$store.$firebase.auth().onAuthStateChanged(async (user) => {
      //   this.$log.debug('currentUser', user);
      //   if (user) await this.loadSettings(user.uid);
      // });
    },
  },
};
</script>

<style scoped>
.offline {
  color: white;
  width: 100%;
}
</style>

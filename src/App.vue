<template>
  <div id="q-app">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="offline" class="offline text-center text-weight-medium bg-tertiary q-pb-xs">
        <small>Sem conexão com a Internet</small>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',

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

    async loadSettings() {
      try {
        await this.getSettings();
      } catch (err) {
        this.$log.error('loadSettings', err);
      }
    },

    addEventHandlers() {
      window.addEventListener('online', this.updateStatus);
      window.addEventListener('offline', this.updateStatus);

      this.$firebase.auth().onAuthStateChanged(async (user) => {
        if (user) await this.loadSettings();
      });
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

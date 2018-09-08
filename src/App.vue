<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',

  methods: {
    ...mapActions('user', [
      'getUser',
    ]),
  },

  async created() {
    await this.getUser('jp@email.com');
  },
};
</script>

<style>
</style>

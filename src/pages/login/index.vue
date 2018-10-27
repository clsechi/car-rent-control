<template>
  <q-page padding>
    <q-btn
      label="Google"
      @click="login"
    />
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  // name: 'PageName'

  mounted() {
    console.log(this.$auth);
  },

  methods: {
    async login() {
      const baseProvider = new this.$auth.GoogleAuthProvider();

      try {
        await this.$auth().signInWithPopup(baseProvider);
        this.$router.replace('/');
      } catch (err) {
        console.log(err);
        this.$q.dialog({
          message: 'Erro com login',
        });
      }
    },
  },
};
</script>

<style>
</style>

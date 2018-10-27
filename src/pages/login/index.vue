<template>
  <q-page padding>
    <h1>Login</h1>
    <div id="firebaseui-auth-container"></div>
  </q-page>
</template>

<script>
import * as firebaseui from 'firebaseui';

export default {
  // name: 'PageName'

  beforeMount() {
    this.initialize();
  },

  methods: {
    // async login() {
    //   const baseProvider = new this.$auth.GoogleAuthProvider();

    //   try {
    //     await this.$auth().signInWithPopup(baseProvider);
    //     this.$router.replace('/');
    //   } catch (err) {
    //     console.log(err);
    //     this.$q.dialog({
    //       message: 'Erro com login',
    //     });
    //   }
    // },

    initialize() {
      const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          // this.$auth.GoogleAuthProvider.PROVIDER_ID,
          // this.$auth.FacebookAuthProvider.PROVIDER_ID,
          // this.$auth.TwitterAuthProvider.PROVIDER_ID,
          // this.$auth.GithubAuthProvider.PROVIDER_ID,
          this.$auth.EmailAuthProvider.PROVIDER_ID,
          // this.$auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: () => {
          window.location.assign('<your-privacy-policy-url>');
        },
      };

      // Initialize the FirebaseUI Widget using Firebase.
      const ui = new firebaseui.auth.AuthUI(this.$auth);
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    },
  },
};
</script>

<style>
</style>

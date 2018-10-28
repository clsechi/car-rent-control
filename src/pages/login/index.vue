<template>
  <q-page padding>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://cdn.firebase.com/libs/firebaseui/3.4.1/firebaseui.css"
    />
    <img
      class="logo"
      src="~/assets/logo.png"
    />
    <div id="firebaseui-auth-container"></div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  // name: 'PageName'

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions('user', [
      'createUser',
      'updateProfile',
    ]),

    async setUserData(data) {
      if (data.additionalUserInfo.isNewUser) {
        await this.createUser(data.user);
        this.$router.push({ name: 'settings' });
      } else {
        await this.updateProfile(data.user);
        this.$router.push({ name: 'summary' });
      }
    },

    initialize() {
      const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
          {
            provider: this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          },
          {
            provider: this.$firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          },
        ],
        tosUrl: 'https://developers.google.com',
        privacyPolicyUrl: 'https://developers.google.com',
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            this.setUserData(authResult);
            return false;
          },
          signInFailure: (err) => {
            this.$q.notify(err.message);
          },
        },
      };

      this.$authUI.start('#firebaseui-auth-container', uiConfig);
    },
  },
};
</script>

<style scoped>
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 50%;
  height: auto;
}
</style>

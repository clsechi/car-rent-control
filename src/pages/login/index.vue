<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-btn
          icon="arrow_back"
          text-color="primary"
          size="1.1em"
          dense
          flat
          no-ripple
          class="q-ml-md"
          @click="$router.push({ name: 'home' })"
        />
      </div>
    </div>
    <img
      class="logo"
      src="~/assets/logo.png"
    />
    <h3 class="text-center title">Rent</h3>
    <div id="firebaseui-auth-container"></div>
  </q-page>
</template>

<script>
import * as firebaseui from 'firebaseui';
import { mapActions } from 'vuex';

export default {
  // name: 'PageName'

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions('user', [
      'updateProfile',
    ]),

    async setUserData(data) {
      if (data.additionalUserInfo.isNewUser) {
        this.$router.push({ name: 'profile' });
      } else {
        this.$router.push({ name: 'summary' });
        await this.updateProfile(data.user);
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
          this.$firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
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
@import url(https://cdn.firebase.com/libs/firebaseui/3.4.1/firebaseui.css);

.title {
  font-weight: 400;
}

.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 40vh;
}
</style>

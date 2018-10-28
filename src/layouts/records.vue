<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          text-color="white"
          size="15px"
          round
          dense
          flat
          no-ripple
          @click="$router.push('/')"
        />
        <q-toolbar-title>
          Registros
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view/>

      <q-inner-loading :visible="loading">
        <q-spinner size="50px" color="primary"></q-spinner>
      </q-inner-loading>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // name: 'LayoutName',

  data() {
    return {
      open: true,
      loading: true,
    };
  },

  computed: {
    ...mapGetters('record', ['records']),

    ...mapGetters('user', [
      'uid',
    ]),
  },

  methods: {
    ...mapActions('record', [
      'getRecords',
    ]),
  },

  async created() {
    await this.getRecords(this.uid);
    this.loading = false;
  },
};
</script>

<style>
</style>

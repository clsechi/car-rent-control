<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="open = !open"
        />
        <q-toolbar-title>
          Registros
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

   <q-layout-drawer
      side="left"
      v-model="open"
    >
      <navigation-drawer/>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import navigationDrawer from '../components/navigationDrawer.vue';

export default {
  // name: 'LayoutName',

  components: {
    'navigation-drawer': navigationDrawer,
  },

  data() {
    return {
      open: true,
    };
  },
};
</script>

<style>
</style>

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
          Configurações
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
};
</script>

<style>
</style>

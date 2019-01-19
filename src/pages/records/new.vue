<template>
  <q-layout>
    <!-- <q-layout-header>
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          text-color="white"
          size="15px"
          round
          dense
          flat
          no-ripple
          @click="$router.go(-1)"
        />
        <q-toolbar-title>
          Novo Registro
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header> -->

    <q-page-container>
      <record-form
        title="Novo registro"
        label="Criar novo registro"
        message="Registro criado com sucesso"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import recordForm from './components/recordForm.vue';

export default {
  name: 'New',

  components: {
    'record-form': recordForm,
  },
};
</script>

<style>
</style>

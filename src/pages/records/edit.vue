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
          @click="$router.go(-1)"
        />
        <q-toolbar-title>
          Editar Registro
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <record-form
        title="Editar registro"
        label="Atualizar registro"
        message="Produto atualizado com sucesso"
        :id="id"
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

  data() {
    return {
      id: this.$route.params.id.toString(),
    };
  },
};
</script>

<style>
</style>

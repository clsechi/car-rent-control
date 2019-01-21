<template>
  <record-form
    title="Novo registro"
    label="Criar novo registro"
    message="Registro criado com sucesso"
  />
</template>

<script>
import recordForm from './components/recordForm.vue';

export default {
  name: 'New',

  components: {
    recordForm,
  },
};
</script>

<style>
</style>

<template>
  <record-form
    title="Novo registro"
    label="Criar novo registro"
    message="Produto criado com sucesso"
  />
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

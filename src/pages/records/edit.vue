<template>
  <record-form
    title="Editar registro"
    label="Atualizar registro"
    message="Produto atualizado com sucesso"
    :id="id"
  />
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

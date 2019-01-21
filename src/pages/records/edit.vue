<template>
  <record-form
    title="Editar registro"
    label="Atualizar registro"
    message="Registro atualizado com sucesso"
    :id="id"
  />
</template>

<script>
import recordForm from './components/recordForm.vue';

export default {
  name: 'Edit',

  components: {
    recordForm,
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

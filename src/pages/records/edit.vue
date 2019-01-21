<template>
  <record-form
    :id="id"
    title="Editar registro"
    label="Atualizar registro"
    message="Registro atualizado com sucesso"
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

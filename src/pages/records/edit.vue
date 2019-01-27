<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated fadeInUp"
    >
      <component
        :is="recordType"
        :id="id"
        label="Salvar"
        message="Registro atualizado com sucesso"
      />
    </transition>
  </q-page>
</template>

<script>
import mainMixin from './components/mainMixin.vue';

export default {
  name: 'Edit',

  mixins: [mainMixin],

  data() {
    return {
      id: this.$route.params.id.toString(),
    };
  },
};
</script>

<style>
</style>

<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated fadeInUp"
    >
      <component
        :is="recordType"
        label="Adicionar"
        message="Registro criado com sucesso"
      />
    </transition>
  </q-page>
</template>

<script>
import mainMixin from './components/mainMixin.vue';

export default {
  name: 'New',

  mixins: [mainMixin],
};
</script>

<style>
</style>

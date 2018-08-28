<template>
  <custom-card
    color="info"
    description="Você gastou:"
    :value="spend ? `R$ ${spend.toFixed()}` : '--'"
    icon="money_off"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'Spendingard',

  components: {
    'custom-card': customCard,
  },

  computed: {
    ...mapGetters('user', ['current']),

    spend() {
      return this.current.expenses;
    },
  },
};
</script>

<style>
</style>

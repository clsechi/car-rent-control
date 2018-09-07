<template>
  <custom-card
    color=""
    description="Precisa pagar:"
    :value="costs ? `R$ ${costs.toFixed(2)}` : '--'"
    icon="fas fa-hand-holding-usd"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'CostsCard',

  components: {
    'custom-card': customCard,
  },

  computed: {
    ...mapGetters('user', [
      'current',
      'settings',
    ]),

    costs() {
      const earnings = this.current.earnings - this.current.expenses;
      const costs = this.settings.rental.cost + this.settings.costs;
      return costs - earnings;
    },
  },
};
</script>

<style>
</style>

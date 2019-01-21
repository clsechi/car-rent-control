<template>
  <custom-card
    :value="costs ? `R$ ${costs.toFixed(2)}` : '--'"
    color=""
    description="Precisa pagar:"
    icon="fas fa-hand-holding-usd"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'CostsCard',

  components: {
    customCard,
  },

  computed: {
    ...mapGetters('user', [
      'rental',
      'personal',
    ]),

    ...mapGetters('status', [
      'status',
    ]),

    costs() {
      const earnings = this.status.earnings - this.status.expenses;
      const costs = this.rental.costs.week + this.personal.costs;
      return costs - earnings;
    },
  },
};
</script>

<style>
</style>

<template>
  <custom-card
    color=""
    description="Meta de hoje:"
    :value="goal ? `R$ ${goal.toFixed(2)}` : '--'"
    icon="fas fa-car-side"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'GoalCard',

  components: {
    'custom-card': customCard,
  },

  computed: {
    ...mapGetters('user', [
      'current',
      'settings',
    ]),

    goal() {
      const earnings = this.current.earnings - this.current.expenses;
      const costs = this.settings.rental.cost + this.settings.costs;
      return (costs - earnings) / this.current.remainingDays;
    },
  },
};
</script>

<style>
</style>

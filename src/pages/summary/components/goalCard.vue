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

    goal() {
      const earnings = this.status.earnings - this.status.expenses;
      const costs = this.rental.costs.week + this.personal.costs;
      return (costs - earnings) / this.status.remainingDays;
    },
  },
};
</script>

<style>
</style>

<template>
  <custom-card
    color="secondary"
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
    ...mapGetters('user', ['current']),

    costs() {
      return this.current.costs;
    },
  },
};
</script>

<style>
</style>

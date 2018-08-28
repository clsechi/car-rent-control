<template>
  <custom-card
    color="positive"
    description="Você já fez::"
    :value="earnings >= 0 ? `R$ ${earnings.toFixed()}` : '--'"
    icon="attach_money"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'EarningsCard',

  components: {
    'custom-card': customCard,
  },

  computed: {
    ...mapGetters('user', ['current']),

    earnings() {
      return this.current.earnings;
    },
  },
};
</script>

<style>
</style>

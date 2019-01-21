<template>
  <custom-card
    color=""
    description="Você já fez:"
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
    customCard,
  },

  computed: {
    ...mapGetters('status', [
      'status',
    ]),

    earnings() {
      return this.status.earnings;
    },
  },
};
</script>

<style>
</style>

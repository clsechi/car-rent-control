<template>
  <custom-card
    :value="spend >= 0 ? `R$ ${spend.toFixed()}` : '--'"
    color=""
    description="Você gastou:"
    icon="money_off"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'Spendingard',

  components: {
    customCard,
  },

  computed: {
    ...mapGetters('status', [
      'status',
    ]),

    spend() {
      return this.status.expenses;
    },
  },
};
</script>

<style>
</style>

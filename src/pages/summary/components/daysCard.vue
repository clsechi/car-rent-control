<template>
  <custom-card
    :value="date ? `${date} dias` : '--'"
    color=""
    description="Dias restantes:"
    icon="date_range"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'DaysCard',

  components: {
    customCard,
  },

  computed: {
    ...mapGetters('status', [
      'status',
    ]),

    date() {
      return this.status.remainingDays;
    },
  },
};
</script>

<style>
</style>

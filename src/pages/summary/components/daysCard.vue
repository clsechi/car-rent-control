<template>
  <custom-card
    color=""
    description="Dias restantes:"
    :value="date ? `${date} dias` : '--'"
    icon="date_range"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'DaysCard',

  components: {
    'custom-card': customCard,
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

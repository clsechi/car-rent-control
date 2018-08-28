<template>
  <custom-card
    color="primary"
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
    ...mapGetters('user', ['current']),

    date() {
      return this.current.remainingDays;
    },
  },
};
</script>

<style>
</style>

<template>
  <custom-card
    :value="distance >= 0 ? `${distance} km` : '--'"
    color=""
    description="Pode dirigir:"
    icon="fas fa-road"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'DistanceCard',

  components: {
    customCard,
  },

  computed: {
    ...mapGetters('user', [
      'rental',
    ]),

    ...mapGetters('status', [
      'status',
    ]),

    distance() {
      return this.rental.km.allowed - this.status.distance;
    },
  },
};
</script>

<style>
</style>

<template>
  <custom-card
    color=""
    description="Pode dirigir:"
    :value="distance >= 0 ? `${distance} km` : '--'"
    icon="fas fa-road"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import customCard from './customCard';

export default {
  name: 'DistanceCard',

  components: {
    'custom-card': customCard,
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

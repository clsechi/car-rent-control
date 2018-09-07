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
      'current',
      'settings',
    ]),

    distance() {
      return this.settings.car.km.allowed - this.current.distance;
    },
  },
};
</script>

<style>
</style>

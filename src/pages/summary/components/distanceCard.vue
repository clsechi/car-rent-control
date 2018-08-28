<template>
  <custom-card
    color="info"
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
    ...mapGetters('user', ['current']),

    distance() {
      return this.current.distance;
    },
  },
};
</script>

<style>
</style>

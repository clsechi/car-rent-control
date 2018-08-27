<template>
  <custom-card
    color="info"
    description="Pode dirigir:"
    :value="`${distance} km`"
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
      'settings',
      'status',
    ]),

    distance() {
      // remainingDistance
      const d = this.status.remainingDays * (this.settings.car.km.allowed / 7);
      console.log(d);
      return d;
    },
  },
};
</script>

<style>
</style>

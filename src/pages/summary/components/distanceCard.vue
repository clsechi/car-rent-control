<template>
  <custom-card
    color="info"
    description="Pode dirigir:"
    :value="`${28578} km`"
    icon="fas fa-road"
  />
</template>

<script>
import customCard from './customCard';

export default {
  name: 'DistanceCard',

  components: {
    'custom-card': customCard,
  },
};
</script>

<style>
</style>

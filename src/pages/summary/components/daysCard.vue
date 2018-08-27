<template>
  <custom-card
    color="primary"
    description="Dias restantes:"
    :value="`${7} dias`"
    icon="date_range"
  />
</template>

<script>
import customCard from './customCard';

export default {
  name: 'DaysCard',

  components: {
    'custom-card': customCard,
  },
};
</script>

<style>
</style>

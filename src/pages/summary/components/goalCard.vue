<template>
  <custom-card
    color="positive"
    description="Meta de hoje:"
    :value="`R$ ${250}`"
    icon="fas fa-car-side"
  />
</template>

<script>
import customCard from './customCard';

export default {
  name: 'GoalCard',

  components: {
    'custom-card': customCard,
  },
};
</script>

<style>
</style>

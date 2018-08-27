<template>
  <custom-card
    color="secondary"
    description="Precisa pagar:"
    :value="`R$ ${2000}`"
    icon="fas fa-hand-holding-usd"
  />
</template>

<script>
import customCard from './customCard';

export default {
  name: 'CostsCard',

  components: {
    'custom-card': customCard,
  },
};
</script>

<style>
</style>

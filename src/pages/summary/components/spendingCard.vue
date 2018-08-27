<template>
  <custom-card
    color="info"
    description="Você gastou:"
    :value="`R$ ${250}`"
    icon="money_off"
  />
</template>

<script>
import customCard from './customCard';

export default {
  name: 'Spendingard',

  components: {
    'custom-card': customCard,
  },
};
</script>

<style>
</style>

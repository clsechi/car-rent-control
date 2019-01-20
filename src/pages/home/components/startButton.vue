<template>
  <q-btn
    label="Começe agora"
    icon-right="arrow_forward"
    size="lg"
    class="start-now"
    color="secondary"
    @click="$router.push({ name: 'login' })"
  />
</template>

<script>
export default {
  name: 'startButton',
};
</script>

<style scoped lang="stylus">
.start-now {
  max-width: 290px
}
</style>

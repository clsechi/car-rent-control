<template>
  <q-fab
    round
    class="fixed"
    size="18px"
    icon="add"
    color="secondary"
    direction="up"
    style="right: 18px; bottom: 18px"
  >
    <q-fab-action
      color="green"
      icon="attach_money"
      @click="$router.push({ name: 'newIncome' })"
    />
    <q-fab-action
      color="red"
      icon="money_off"
      @click="$router.push({ name: 'newExpense' })"
    />
    <q-fab-action
      color="orange"
      icon="local_gas_station"
      @click="$router.push({ name: 'newRefueling' })"
    />
    <q-fab-action
      color="brown"
      icon="build"
      @click="$router.push({ name: 'newMaintenance' })"
    />
  </q-fab>
</template>

<script>
export default {
  name: 'newRecordButton',
};
</script>

<style>
</style>

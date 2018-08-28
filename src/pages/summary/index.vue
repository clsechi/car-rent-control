<template>
  <q-page padding>
    <div class="row flex justify-around gutter-sm">
      <div class="col-xs-12 col-sm-6">
        <goal-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <costs-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <days-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <distance-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <spending-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <earnings-card/>
      </div>
    </div>
    <q-btn
      round
      class="fixed"
      size="20px"
      icon="add"
      color="secondary"
      @click="$router.push({ name: 'new' })"
      style="right: 18px; bottom: 18px"
    />
  </q-page>
</template>

<script>
import costsCard from './components/costsCard.vue';
import daysCard from './components/daysCard.vue';
import distanceCard from './components/distanceCard.vue';
import earningsCard from './components/earningsCard.vue';
import goalCard from './components/goalCard.vue';
import spendingCard from './components/spendingCard.vue';

export default {
  name: 'PageIndex',

  components: {
    'costs-card': costsCard,
    'days-card': daysCard,
    'distance-card': distanceCard,
    'earnings-card': earningsCard,
    'goal-card': goalCard,
    'spending-card': spendingCard,
  },
};
</script>

<style scoped>
/* .card-text {
  margin: 0px;
} */
</style>

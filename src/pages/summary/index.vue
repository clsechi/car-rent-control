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
      <div v-if="showDistance" class="col-xs-12 col-sm-6">
        <distance-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <spending-card/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <earnings-card/>
      </div>
    </div>
    <new-record-button/>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import newRecordButton from '../../components/newRecordButton.vue';
import costsCard from './components/costsCard.vue';
import daysCard from './components/daysCard.vue';
import earningsCard from './components/earningsCard.vue';
import goalCard from './components/goalCard.vue';
import spendingCard from './components/spendingCard.vue';

export default {
  name: 'PageIndex',

  components: {
    costsCard,
    daysCard,
    earningsCard,
    goalCard,
    spendingCard,
    distanceCard: () => import('./components/distanceCard.vue'),
    newRecordButton,
  },

  computed: {
    ...mapGetters('user', [
      'rental',
    ]),

    showDistance() {
      return this.rental.km.hasLimit;
    },
  },
};
</script>

<style scoped>
/* .card-text {
  margin: 0px;
} */
</style>

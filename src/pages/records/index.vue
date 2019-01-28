<template>
  <q-page padding>
    <div v-if="ordenedRecords.length === 0" class="text-center">
      <p class="q-display-1">Nenhum registro encontrado :(</p>
      <p class="q-subheading">
        Clique em <q-icon name="add" size="20px"/>
        para criar seu primeiro registro
      </p>
    </div>
    <div v-else class="row gutter-sm">
      <div
        v-for="record in ordenedRecords"
        :key="record.id"
        class="col-xs-12 col-sm-6"
      >
        <record-card :record="record"/>
      </div>
    </div>
    <new-record-button/>
    <q-inner-loading :visible="loading" class="bg-white">
      <q-spinner size="50px" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script>
import orderBy from 'lodash/orderBy';
import { mapGetters, mapActions } from 'vuex';
import newRecordButton from '../../components/newRecordButton.vue';
import recordCard from './components/recordCard.vue';

export default {
  name: 'recordsIndex',

  components: {
    newRecordButton,
    recordCard,
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapGetters('record', ['records']),

    ordenedRecords() {
      return orderBy(this.records, 'date', 'desc');
    },
  },

  async created() {
    await this.getRecords();
    this.loading = false;
  },

  methods: {
    ...mapActions('record', [
      'getRecords',
    ]),
  },
};
</script>

<style>
</style>

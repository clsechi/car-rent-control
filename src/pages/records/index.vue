<template>
  <q-page padding>
    <div v-if="ordenedRecords.length === 0" class="text-center">
      <p class="q-display-1">Nenhum registro encontrado :(</p>
      <p class="q-subheading">
        Clique no <q-icon name="add" size="20px"/>
        para criar seu primeiro registro
      </p>
    </div>
    <div v-else class="row gutter-sm">
      <div
        v-for="record in ordenedRecords"
        :key="record.id"
        class="col-12"
      >
        <q-card>
          <q-card-main>
            <div class="row">
              <div class="col-xs-6 col-md-8 flex">
                <div class="row q-subheading items-center gutter-xs">
                  <div class="col-xs-12 col-md-auto">
                    Distância: <span class="text-weight-bold">{{ record.distance }} km</span>
                  </div>
                  <div class="col-xs-12 col-md-auto">
                    Gastos:
                    <span class="text-weight-bold">
                      R$ {{ (record.expenses.fuel + record.expenses.others).toFixed(2) }}
                    </span>
                  </div>
                  <div class="col-xs-12 col-md-auto">
                    Ganhos:
                    <span class="text-weight-bold">
                      R$ {{ record.earnings.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-xs-5 col-md-3 flex flex-center">
                <div class="text-center q-subheading">
                  <div>{{ record.date | formatDate }}</div>
                  <hr/>
                  <div>{{ record.date.getFullYear() }}</div>
                </div>
              </div>
              <div class="col-1">
                <q-btn
                  round
                  flat
                  dense
                  icon="more_vert"
                  no-ripple
                >
                  <q-popover>
                    <q-list>
                      <q-item v-close-overlay>
                        <q-btn
                          round
                          icon="edit"
                          color="secondary"
                          @click="$router.push({ name: 'edit', params: {id: record.id}})"
                        />
                      </q-item>
                      <q-item v-close-overlay>
                        <q-btn
                          round
                          icon="delete"
                          color="negative"
                          @click="confirmDelete(record)"
                        />
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <q-btn
      round
      size="18px"
      class="fixed"
      icon="add"
      color="secondary"
      style="right: 18px; bottom: 18px"
      @click="$router.push({ name: 'new' })"
    />
    <q-inner-loading :visible="loading" class="bg-white">
      <q-spinner size="50px" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script>
import orderBy from 'lodash/orderBy';
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

export default {
  name: 'Index',

  filters: {
    formatDate(val) {
      return date.formatDate(val, 'DD/MM');
    },
  },

  data() {
    return {
      open: true,
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
      'deleteRecord',
    ]),

    async confirmDelete(record) {
      try {
        await this.$q.dialog({
          title: 'Confirmação',
          message: 'Excluir registro?',
          ok: 'Excluir',
          cancel: 'Cancelar',
        });
        this.deleteActualRecord(record);
      } catch (err) {} // eslint-disable-line
    },

    async deleteActualRecord(record) {
      try {
        await this.deleteRecord(record);
        this.$q.notify({
          type: 'info',
          message: 'Registro excluído',
        });
      } catch (err) {
        this.$log.error('deleteActualRecord', err);
        this.$q.notify({
          message: 'Ocorreu um erro!',
        });
      }
    },
  },
};
</script>

<style>

</style>

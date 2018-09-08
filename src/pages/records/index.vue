<template>
  <q-page padding>
    <div class="row gutter-sm">
      <div
        class="col-12"
        v-for="record in ordenedRecords"
        :key="record.id"
      >
        <q-card color="tertiary">
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
              <div class="col-xs-5 col-md-2 flex flex-center">
                <div class="text-center q-subheading">
                  <div>{{ formatDate(record.date) }}</div>
                  <hr>
                  <div>{{ record.date.getFullYear() }}</div>
                </div>
              </div>
              <div class="col-1 flex">
                <div>
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
                            color="primary"
                            @click="$router.push({ name: 'edit', params: {id: record.id}})"
                          />
                        </q-item>
                        <q-item v-close-overlay>
                          <q-btn
                            round
                            icon="delete"
                            color="negative"
                            @click="confirmDelete(record.id)"
                          />
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </div>
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
      @click="$router.push({ name: 'new' })"
      style="right: 18px; bottom: 18px"
    />
  </q-page>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

export default {
  name: 'Index',

  computed: {
    ...mapGetters('record', ['records']),

    ordenedRecords() {
      return _.orderBy(this.records, 'date', 'desc');
    },
  },

  methods: {
    ...mapActions('record', [
      'deleteRecord',
    ]),

    formatDate(val) {
      return date.formatDate(val, 'DD/MM');
    },

    async confirmDelete(id) {
      try {
        await this.$q.dialog({
          title: 'Confirmação',
          message: 'Excluir registro?',
          ok: 'Excluir',
          cancel: 'Cancelar',
        });
        this.deleteActualRecord(id);
      } catch (err) {} // eslint-disable-line
    },

    async deleteActualRecord(id) {
      try {
        await this.deleteRecord({
          id,
          userId: 'jp@email.com',
        });
        this.$q.notify({
          type: 'info',
          message: 'Registro excluído',
        });
      } catch (err) {
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

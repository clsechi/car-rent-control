<template>
  <q-page padding>
    <div class="row gutter-sm">
      <div
        class="col-12"
        v-for="record in records"
        :key="record.id"
      >
        <q-card color="grey-7">
          <q-card-main>
            <div class="row">
              <div class="col-xs-6 col-md-8 flex">
                <div class="row q-subheading items-center gutter-xs">
                  <div class="col-xs-12 col-md-auto">
                    Distância: <span class="text-weight-bold">{{ record.kms }} km</span>
                  </div>
                  <div class="col-xs-12 col-md-auto">
                    Gastos: <span class="text-weight-bold">R$ {{ record.costs.toFixed(2) }}</span>
                  </div>
                  <div class="col-xs-12 col-md-auto">
                    Ganhos:
                    <span class="text-weight-bold">
                      R$ {{ record.earnings.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-xs-4 col-md-2 flex flex-center">
                <div class="text-center q-subheading">
                  <div>{{ formatDate(record.date) }}</div>
                  <hr>
                  <div>{{ record.date.getFullYear() }}</div>
                </div>
              </div>
              <div class="col-2 flex justify-end items-center">
                <div>
                  <q-btn
                    round
                    class="q-ma-xs"
                    icon="edit"
                    color="primary"
                    @click="$router.push({ name: 'edit', params: {id: record.id}})"
                  />
                </div>
                <div>
                  <q-btn
                    round
                    class="q-ma-xs"
                    icon="delete"
                    color="negative"
                    @click="confirmDelete(record.id)"
                  />
                </div>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <q-btn
      round
      size="20px"
      class="fixed"
      icon="add"
      color="secondary"
      @click="$router.push({ name: 'new' })"
      style="right: 18px; bottom: 18px"
    />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

export default {
  computed: {
    ...mapGetters('record', ['records']),
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

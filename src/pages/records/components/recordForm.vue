<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeInUp"
    >
      <q-card>
        <q-card-main>
          <q-field
            :error="$v.form.date.$error"
            class="q-mb-md"
            error-label="Campo obrigatório"
            icon="today"
          >
            <q-datetime
              v-model="form.date"
              type="date"
              float-label="Data"
              format="dddd, DD/MM/YYYY"
              inverted-light
              dark
              color="grey-4"
              @blur="$v.form.date.$touch"
            />
          </q-field>
          <q-field
            class="q-my-md"
            icon="fas fa-road"
          >
            <q-input
              v-model="form.distance"
              float-label="Quilômetros rodados"
              type="number"
              suffix="Km"
              inverted-light
              color="grey-4"
            />
          </q-field>
          <q-field
            :error="$v.form.expenses.fuel.$error"
            class="q-my-md"
            error-label="Campo obrigatório"
            icon="local_gas_station"
          >
            <q-input
              v-model="form.expenses.fuel"
              :decimals="2"
              :step="0.01"
              float-label="Gastos com combustível"
              type="number"
              prefix="R$"
              inverted-light
              color="grey-4"
              @blur="$v.form.expenses.fuel.$touch"
            />
          </q-field>
          <q-field
            class="q-my-md"
            icon="money_off"
          >
            <q-input
              v-model="form.expenses.others"
              :decimals="2"
              :step="0.01"
              float-label="Outros gastos"
              type="number"
              prefix="R$"
              inverted-light
              color="grey-4"
            />
          </q-field>
          <q-field
            :error="$v.form.earnings.$error"
            class="q-my-md"
            error-label="Campo obrigatório"
            icon="attach_money"
          >
            <q-input
              v-model="form.earnings"
              :decimals="2"
              :step="0.01"
              float-label="Ganhos :)"
              type="number"
              prefix="R$"
              inverted-light
              color="grey-4"
              @blur="$v.form.earnings.$touch"
            />
          </q-field>
          <div class="flex justify-around">
            <q-btn
              class="q-my-lg"
              color="primary"
              label="Voltar"
              @click="$router.go(-1)"
            />
            <q-btn
              :label="label"
              :loading="loading"
              class="q-my-lg"
              color="positive"
              @click="validateAndCreateRecord"
            />
          </div>
        </q-card-main>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Form',

  props: {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      form: {
        date: new Date(),
        distance: null,
        expenses: {
          fuel: null,
          others: null,
        },
        earnings: null,
      },
      loading: false,
    };
  },

  computed: {
    ...mapGetters('record', ['records']),
  },

  created() {
    if (this.id) this.findRecord();
  },

  validations: {
    form: {
      date: { required },
      expenses: {
        fuel: { required },
      },
      earnings: { required },
    },
  },

  methods: {
    ...mapActions('record', [
      'createRecord',
      'updateRecord',
      'getRecords',
    ]),

    findRecord() {
      const data = this.records.find(record => record.id === this.id);
      if (!data) {
        this.$q.notify('Registro não encontrado!');
      } else {
        this.form = data;
      }
    },
    async validateAndCreateRecord() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Por favor preencha os campos corretamente.',
        });
        return;
      }
      this.loading = true;
      try {
        await this.getRecords();
        if (this.id) {
          await this.updateRecord(this.form);
        } else {
          await this.createRecord(this.form);
        }
        this.$q.notify({
          type: 'positive',
          message: this.message,
        });
        this.$router.go(-1);
      } catch (err) {
        this.$log.error('validateAndCreateRecord', err);
        this.$q.notify({
          message: 'Ocorreu um erro!',
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>

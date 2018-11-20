<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated fadeInUp"
    >
      <q-card>
        <q-card-main>
          <q-field
            class="q-mb-md"
            error-label="Campo obrigatório"
            icon="today"
            :error="$v.form.date.$error"
          >
            <q-datetime
              v-model="form.date"
              type="date"
              float-label="Data"
              format="dddd, DD/MM/YYYY"
              @blur="$v.form.date.$touch"
              inverted-light
              dark
              color="grey-4"
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
            class="q-my-md"
            error-label="Campo obrigatório"
            icon="local_gas_station"
            :error="$v.form.expenses.fuel.$error"
          >
            <q-input
              v-model="form.expenses.fuel"
              float-label="Gastos com combustível"
              type="number"
              :decimals="2"
              prefix="R$"
              :step="0.01"
              @blur="$v.form.expenses.fuel.$touch"
              inverted-light
              color="grey-4"
            />
          </q-field>
          <q-field
            class="q-my-md"
            icon="money_off"
          >
            <q-input
              v-model="form.expenses.others"
              float-label="Outros gastos"
              type="number"
              :decimals="2"
              prefix="R$"
              :step="0.01"
              inverted-light
              color="grey-4"
            />
          </q-field>
          <q-field
            class="q-my-md"
            error-label="Campo obrigatório"
            icon="attach_money"
            :error="$v.form.earnings.$error"
          >
            <q-input
              v-model="form.earnings"
              float-label="Ganhos :)"
              type="number"
              :decimals="2"
              prefix="R$"
              :step="0.01"
              @blur="$v.form.earnings.$touch"
              inverted-light
              color="grey-4"
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
              class="q-my-lg"
              color="positive"
              :label="label"
              @click="validateAndCreateRecord"
              :loading="loading"
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

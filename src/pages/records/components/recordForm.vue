<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated fadeInUp"
    >
      <q-card>
        <q-card-title>
          <span slot="subtitle">{{ title }}</span>
        </q-card-title>
        <q-card-main>
          <q-field
            helper="O dia que você fez as corridas"
            error-label="Campo obrigatório"
            icon="3d_rotation"
            :error="$v.form.date.$error"
          >
            <q-datetime
              v-model="form.date"
              type="date"
              float-label="Data"
              format="dddd, DD/MM/YYYY"
              @blur="$v.form.date.$touch"
              inverted
              color="tertiary"
            />
          </q-field>
          <q-field
            helper="Quantos kms seu carro andou hoje"
            error-label="Campo obrigatório"
            icon="3d_rotation"
            :error="$v.form.distance.$error"
          >
            <q-input
              v-model="form.distance"
              float-label="Quilômetros rodados"
              type="number"
              suffix="Km"
              @blur="$v.form.distance.$touch"
              inverted
              color="tertiary"
            />
          </q-field>
          <q-field
            helper="Colocou combustível hoje?"
            error-label="Campo obrigatório"
            icon="3d_rotation"
            :error="$v.form.costs.fuel.$error"
          >
            <q-input
              v-model="form.costs.fuel"
              float-label="Gastos com combustível"
              type="number"
              :decimals="2"
              prefix="R$"
              :step="0.01"
              @blur="$v.form.costs.fuel.$touch"
              inverted
              color="tertiary"
            />
          </q-field>
          <q-field
            helper="A soma dos gastos de hoje, fora o combustível"
            error-label="Campo obrigatório"
            icon="3d_rotation"
            :error="$v.form.costs.others.$error"
          >
            <q-input
              v-model="form.costs.others"
              float-label="Outros gastos"
              type="number"
              :decimals="2"
              prefix="R$"
              :step="0.01"
              @blur="$v.form.costs.others.$touch"
              inverted
              color="tertiary"
            />
          </q-field>
          <q-field
            helper="A soma dos ganhos de hoje com as corridas"
            error-label="Campo obrigatório"
            icon="3d_rotation"
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
              inverted
              color="tertiary"
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
        distance: '',
        costs: {
          fuel: '',
          others: '',
        },
        earnings: '',
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
      distance: { required },
      costs: {
        fuel: { required },
        others: { required },
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
          await this.updateRecord({
            payload: this.form,
            userId: 'jp@email.com',
          });
        } else {
          await this.createRecord({
            payload: this.form,
            userId: 'jp@email.com',
          });
        }
        this.$router.push({ name: 'records' });
        this.$q.notify({
          type: 'positive',
          message: this.message,
        });
      } catch (err) {
        this.loading = false;
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

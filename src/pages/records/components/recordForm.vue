<template>
  <q-page padding>
    <q-card>
      <q-card-title>
        <span slot="subtitle">{{ title }}</span>
      </q-card-title>
      <q-card-main>
        <q-field
          helper="O dia que você fez as corridas"
          :error="$v.form.date.$error"
        >
          <q-datetime
            v-model="form.date"
            type="date"
            placeholder="Data"
            format="dddd, DD/MM/YYYY"
            @blur="$v.form.date.$touch"
          />
        </q-field>
        <q-field
          helper="Quantos kms seu carro andou hoje"
          error-label="Campo obrigatório"
          :error="$v.form.kms.$error"
        >
          <q-input
            v-model="form.kms"
            float-label="Quilômetros rodados"
            type="number"
            suffix="Km"
            @blur="$v.form.kms.$touch"
          />
        </q-field>
        <q-field
          helper="A soma de tudo que você gastou hoje"
          error-label="Campo obrigatório"
          :error="$v.form.costs.$error"
        >
          <q-input
            v-model="form.costs"
            float-label="Gastos"
            type="number"
            :decimals="2"
            prefix="R$"
            :step="0.01"
            @blur="$v.form.costs.$touch"
          />
        </q-field>
        <q-field
          helper="A soma de tudo que você ganhou hoje com Uber/99"
          error-label="Campo obrigatório"
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
          />
        </q-field>
        <q-btn
          class="q-my-lg full-width"
          color="positive"
          :label="label"
          @click="validateAndCreateRecord"
          :loading="loading"
        />
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
// import { date } from 'quasar';
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
        kms: '',
        costs: '',
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
      kms: { required },
      costs: { required },
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

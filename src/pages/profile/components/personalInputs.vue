<template>
  <div>
    <q-field
      :error="$v.form.costs.$error"
      error-label="Campo obrigatório"
      helper="Outros custos fixos semanais (Ex: Alimentação)"
    >
      <q-input
        v-model.trim="form.costs"
        type="number"
        prefix="R$"
        float-label="Outros custos"
        @blur="$v.form.costs.$touch"
      />
    </q-field>
    <q-field
      helper="Horário que começa a trabalhar"
    >
      <q-datetime
        v-model="form.startHour"
        :default-value="new Date()"
        type="time"
        float-label="Inicio do dia"
      />
    </q-field>
    <q-field
      helper="Horário que para de trabalhar"
    >
      <q-datetime
        v-model="form.endHour"
        :default-value="form.startHour"
        type="time"
        float-label="Fim do dia"
      />
    </q-field>
    <q-stepper-navigation class="q-mt-md">
      <q-btn
        color="secondary"
        flat
        label="Voltar"
        @click="$emit('previous')"
      />
      <q-btn
        :disable="$v.form.$error"
        color="secondary"
        label="Continuar"
        @click="validateAndUpdateSettings"
      />
    </q-stepper-navigation>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'carInputs',

  data() {
    return {
      form: {
        costs: null,
        startHour: null,
        endHour: null,
      },
    };
  },

  computed: {
    ...mapGetters('user', ['personal']),

    isRequired() {
      return this.form.km.hasLimit;
    },
  },

  created() {
    this.updateForm();
  },

  validations: {
    form: {
      costs: { required },
    },
  },

  methods: {
    ...mapActions('user', [
      'updatePersonal',
    ]),

    updateForm() {
      if (this.personal) this.form = this.personal;
    },

    updateError() {
      this.$emit('update:error', this.$v.form.$error);
    },

    async validateAndUpdateSettings() {
      this.$v.form.$touch();

      this.updateError();

      if (!this.$v.form.$error) {
        this.$emit('update:completed', true);
        this.$emit('next');

        try {
          await this.updatePersonal(this.form);
        } catch (err) {
          this.$log.error('validateAndUpdateSettings', err);
          this.$q.notify({
            message: 'Ocorreu um erro!',
          });
        }
      } else {
        this.$emit('update:completed', false);
      }
    },
  },
};
</script>

<style>
</style>

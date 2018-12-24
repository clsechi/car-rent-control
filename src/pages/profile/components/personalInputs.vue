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
        type="time"
        :default-value="new Date()"
        float-label="Inicio do dia"
      />
    </q-field>
    <q-field
      helper="Horário que para de trabalhar"
    >
      <q-datetime
        v-model="form.endHour"
        type="time"
        :default-value="form.startHour"
        float-label="Fim do dia"
      />
    </q-field>
    <q-stepper-navigation class="q-mt-md">
      <q-btn color="secondary"
        flat
        @click="$emit('previous')"
        label="Voltar"
      />
      <q-btn
        color="secondary"
        label="Continuar"
        @click="validateAndUpdateSettings"
        :disable="$v.form.$error"
      />
    </q-stepper-navigation>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'carInputs',
  computed: {
    ...mapGetters('user', ['personal']),

    isRequired() {
      return this.form.km.hasLimit;
    },
  },

  created() {
    this.updateForm();
  },

  data() {
    return {
      form: {
        costs: null,
        startHour: null,
        endHour: null,
      },
    };
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

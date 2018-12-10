<template>
  <div>
    <q-field
      :error="$v.form.costs.week.$error"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model.number="form.costs.week"
        type="number"
        float-label="Custo do aluguel por semana"
        prefix="R$"
        @blur="$v.form.costs.week.$touch"
      />
    </q-field>
    <q-field
      helper="Possui limite de quilometragem semanal"
    >
      <q-toggle
        v-model="form.km.hasLimit"
        label="Limite de KMs"
        @input="cleanFields"
      />
    </q-field>
    <div v-if="isRequired" class="q-mt-sm">
      <q-field
        :error="$v.form.costs.exceeded.$error"
        error-label="Campo obrigatório"
      >
        <q-input
          v-model.number="form.costs.exceeded"
          type="number"
          float-label="Custo por KM excedido"
          prefix="R$"
          @blur="$v.form.costs.exceeded.$touch"
        />
      </q-field>
      <q-field
        :error="$v.form.km.allowed.$error"
        error-label="Campo obrigatório"
      >
        <q-input
          v-model.number="form.km.allowed"
          type="number"
          float-label="Quilometragem semanal permitida"
          suffix="Km"
          @blur="$v.form.km.allowed.$touch"
        />
      </q-field>
    </div>
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
import { mapGetters, mapActions } from 'vuex';
import { required, requiredIf } from 'vuelidate/lib/validators';

export default {
  name: 'rentalInputs',

  computed: {
    ...mapGetters('user', ['rental']),

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
        costs: {
          week: null,
          exceeded: null,
        },
        km: {
          hasLimit: false,
          allowed: null,
        },
      },
    };
  },

  validations: {
    form: {
      costs: {
        week: { required },
        exceeded: {
          required: requiredIf(function validate() {
            return this.isRequired;
          }),
        },
      },
      km: {
        allowed: {
          required: requiredIf(function validate() {
            return this.isRequired;
          }),
        },
      },
    },
  },

  methods: {
    ...mapActions('user', [
      'updateRental',
    ]),

    updateForm() {
      if (this.rental) this.form = this.rental;
    },

    cleanFields() {
      this.form.costs.exceeded = '';
      this.form.km.allowed = '';
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
          await this.updateRental(this.form);
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

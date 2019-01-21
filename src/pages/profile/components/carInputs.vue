<template>
  <div>
    <q-field
      :error="$v.form.nickname.$error"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model.trim="form.nickname"
        type="text"
        float-label="Apelido"
        @blur="$v.form.nickname.$touch"
      />
    </q-field>
    <q-field
      helper="Opcional"
    >
      <q-input
        v-model.trim="form.plate"
        :maxlength="8"
        type="text"
        float-label="Placa do veículo"
        upper-case
      />
    </q-field>
    <q-field
      helper="Opcional"
    >
      <q-input
        v-model.lazy="form.km.actual"
        type="number"
        float-label="Quilometragem atual"
        suffix="Km"
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
        nickname: null,
        plate: null,
        km: {
          actual: null,
        },
      },
    };
  },

  computed: {
    ...mapGetters('user', ['car']),

    isRequired() {
      return this.form.km.hasLimit;
    },
  },

  created() {
    this.updateForm();
  },

  validations: {
    form: {
      nickname: { required },
    },
  },

  methods: {
    ...mapActions('user', [
      'updateCar',
    ]),

    updateForm() {
      if (this.car) this.form = this.car;
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
          await this.updateCar(this.form);
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

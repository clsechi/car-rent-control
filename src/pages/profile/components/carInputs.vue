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
        type="text"
        float-label="Placa do veículo"
        :maxlength="8"
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
    ...mapGetters('user', ['car']),

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
        nickname: null,
        plate: null,
        km: {
          actual: null,
        },
      },
    };
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

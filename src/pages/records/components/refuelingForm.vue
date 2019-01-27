<template>
  <div>
    <q-field
      :error="$v.form.date.$error"
      class="q-mb-xs"
      error-label="Campo obrigatório"
      icon="today"
    >
      <q-datetime
        v-model="form.date"
        type="datetime"
        float-label="Data"
        format="dddd, DD/MM/YYYY - HH:mm"
        inverted-light
        dark
        color="grey-4"
        @blur="$v.form.date.$touch"
      />
    </q-field>
    <q-field
      class="q-mb-lg"
      icon="money"
    >
      <q-input
        v-model="form.odometer"
        :decimals="0"
        :step="1"
        float-label="Odômetro atual"
        type="number"
        suffix="km"
        inverted-light
        color="grey-4"
      />
    </q-field>
    <q-field
      :error="$v.form.fuelType.$error"
      class="q-mb-xs"
      error-label="Campo obrigatório"
      icon="label"
    >
      <q-select
        v-model="form.fuelType"
        :options="fuelTypeOptions"
        float-label="Tipo de combustível"
        inverted-light
        color="grey-4"
        @blur="$v.form.fuelType.$touch"
      />
    </q-field>
    <q-field
      class="q-mb-lg"
      icon="attach_money"
    >
      <q-input
        v-model="form.literPrice"
        :decimals="2"
        :step="0.01"
        float-label="Preço por Litro"
        type="number"
        prefix="R$"
        inverted-light
        color="grey-4"
      />
    </q-field>
    <q-field
      :error="$v.form.value.$error"
      class="q-mb-xs"
      error-label="Campo obrigatório"
      icon="attach_money"
    >
      <q-input
        v-model="form.value"
        :decimals="2"
        :step="0.01"
        float-label="Valor total"
        type="number"
        prefix="R$"
        inverted-light
        color="grey-4"
        @blur="$v.form.value.$touch"
      />
    </q-field>
    <confirm-button
      :label="label"
      :loading="loading"
      @confirmed="validateAndCreateRecord"
    />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import formMixin from './formMixin';

export default {
  name: 'refuelingForm',

  mixins: [formMixin],

  data() {
    return {
      form: {
        type: 'REFUELING',
        date: new Date(),
        odometer: null,
        fuelType: 'Gasolina Comum',
        literPrice: null,
        value: null,
      },
    };
  },

  computed: {
    fuelTypeOptions() {
      const options = [
        'Gasolina Comum',
        'Gasolina Adtivada',
        'Etanol',
        'Etanol Adtivado',
        'GNV',
        'Diesel',
        'Elétrico',
        'Outro',
      ];
      return options.map(option => ({
        label: option,
        value: option,
      }));
    },
  },

  validations: {
    form: {
      date: { required },
      fuelType: { required },
      value: { required },
    },
  },
};
</script>

<style>

</style>

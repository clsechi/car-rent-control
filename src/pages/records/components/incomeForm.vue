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
      :error="$v.form.earnedWith.$error"
      class="q-mb-xs"
      error-label="Campo obrigatório"
      icon="label"
    >
      <q-select
        v-model="form.earnedWith"
        :options="earnedWithOptions"
        float-label="Ganho com"
        inverted-light
        color="grey-4"
        @blur="$v.form.earnedWith.$touch"
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
        float-label="Valor"
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
  name: 'incomeForm',

  mixins: [formMixin],

  data() {
    return {
      form: {
        type: 'INCOME',
        date: new Date(),
        earnedWith: 'Aplicativos',
        value: null,
      },
    };
  },

  computed: {
    earnedWithOptions() {
      const options = [
        'Aplicativos',
        'Corrida Particular',
        'Gorjeta',
        'Outros',
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
      earnedWith: { required },
      value: { required },
    },
  },
};
</script>

<style>

</style>

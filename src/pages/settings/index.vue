<template>
  <q-page padding>
    <q-field
      helper="Seu carro tem quantos kms?"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model="form.car.km.actual"
        float-label="*Quilometragem atual"
        type="number"
        suffix="Km"
      />
    </q-field>
    <q-field
      helper="Os kms combinados com a locadora"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model="form.car.km.allowed"
        float-label="*Quilometragem semanal"
        type="number"
        suffix="Km"
      />
    </q-field>
    <q-field
      helper="O custo combinado com a locadora"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model="form.rental.cost"
        float-label="*Custo carro p/ semana"
        type="number"
        :decimals="2"
        prefix="R$"
        :step="0.01"
      />
    </q-field>
    <q-field
      helper="Iremos te lembrar do seu rodízio"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model="form.car.plate"
        float-label="Placa do veículo"
        type="text"
      />
    </q-field>
    <q-field
      helper="Caso você exceda a quilometragem permitida"
      error-label="Campo obrigatório"
    >
      <q-input
        v-model="form.rental.exceeded"
        float-label="Custo p/ quilômetro excedido"
        type="number"
        :decimals="2"
        prefix="R$"
        :step="0.01"
      />
    </q-field>
    <q-btn
      class="q-my-lg float-right full-width"
      color="positive"
      label="Salvar"
      @click="validateAndUpdateSettings"
      :loading="loading"
    />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'IndexSettings',

  data() {
    return {
      form: {
        car: {
          km: {
            actual: '',
            allowed: '',
          },
          plate: '',
        },
        rental: {
          cost: '',
          exceeded: '',
        },
      },
      loading: false,
    };
  },

  computed: {
    ...mapGetters('user', ['settings']),
  },

  created() {
    if (this.settings) this.form = this.settings;
  },

  methods: {
    ...mapActions('user', [
      'updateSettings',
    ]),

    async validateAndUpdateSettings() {
      // this.$v.form.$touch();

      // if (this.$v.form.$error) {
      //   this.$q.notify({
      //     message: 'Por favor preencha os campos corretamente.',
      //   });
      //   return;
      // }
      this.loading = true;
      try {
        await this.updateSettings({
          payload: {
            settings: this.form,
          },
          userId: 'jp@email.com',
        });
        this.$q.notify({
          type: 'positive',
          message: 'Configurações atualizadas com sucesso',
        });
      } catch (err) {
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

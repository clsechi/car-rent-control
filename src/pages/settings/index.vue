<template>
  <q-page padding>
    <q-card>
      <q-card-title>
        <span class="title">Configurações</span>
        <q-btn
          :disable="!readonly"
          color="primary"
          class="float-right q-pa-sm"
          icon="edit"
          @click="readonly = false"
        />
      </q-card-title>
      <q-card-main>
        <q-field
          helper="Seu carro tem quantos kms?"
          error-label="Campo obrigatório"
          icon="3d_rotation"
        >
          <q-input
            :readonly="readonly"
            v-model="form.car.km.actual"
            float-label="Quilometragem atual"
            type="number"
            suffix="Km"
            inverted
            color="tertiary"
          >
          </q-input>
        </q-field>
        <q-field
          helper="Os kms combinados com a locadora"
          error-label="Campo obrigatório"
          icon="3d_rotation"
          :error="$v.form.car.km.allowed.$error"
        >
          <q-input
            :readonly="readonly"
            @blur="$v.form.car.km.allowed.$touch"
            v-model="form.car.km.allowed"
            float-label="*Quilometragem semanal permitida"
            type="number"
            suffix="Km"
            inverted
            color="tertiary"
          />
        </q-field>
        <q-field
          helper="O custo combinado com a locadora"
          error-label="Campo obrigatório"
          icon="3d_rotation"
          :error="$v.form.rental.cost.$error"
        >
          <q-input
            :readonly="readonly"
            @blur="$v.form.rental.cost.$touch"
            v-model="form.rental.cost"
            float-label="*Custo carro p/ semana"
            type="number"
            :decimals="2"
            prefix="R$"
            :step="0.01"
            inverted
            color="tertiary"
          />
        </q-field>
        <q-field
          helper="Caso você exceda a quilometragem permitida"
          error-label="Campo obrigatório"
          icon="3d_rotation"
          :error="$v.form.rental.exceeded.$error"
        >
          <q-input
            :readonly="readonly"
            @blur="$v.form.rental.exceeded.$touch"
            v-model="form.rental.exceeded"
            float-label="*Custo por quilômetro excedido"
            type="number"
            :decimals="2"
            prefix="R$"
            :step="0.01"
            inverted
            color="tertiary"
          />
        </q-field>
        <q-field
          helper="Custos fixos que você possui"
          error-label="Campo obrigatório"
          icon="3d_rotation"
        >
          <q-input
            :readonly="readonly"
            v-model="form.costs"
            float-label="Outros custos semanais"
            type="number"
            :decimals="2"
            prefix="R$"
            :step="0.01"
            inverted
            color="tertiary"
          />
        </q-field>
        <q-field
          helper="Iremos te lembrar do seu rodízio"
          error-label="Campo obrigatório"
          icon="3d_rotation"
        >
          <q-input
            :readonly="readonly"
            v-model="form.car.plate"
            float-label="Placa do veículo"
            type="text"
            upper-case
            inverted
            color="tertiary"
          />
        </q-field>
        <div class="flex justify-around" v-if="!readonly">
          <q-btn
            :disable="loading"
            class="q-my-lg"
            color="negative"
            label="Cancelar"
            @click="$router.push('/')"
          />
          <q-btn
            class="q-my-lg"
            color="positive"
            label="Salvar"
            @click="validateAndUpdateSettings"
            :loading="loading"
          />
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

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
        costs: '',
      },
      loading: false,
      readonly: true,
    };
  },

  validations: {
    form: {
      car: {
        km: {
          allowed: { required },
        },
      },
      rental: {
        cost: { required },
        exceeded: { required },
      },
    },
  },

  computed: {
    ...mapGetters('user', ['settings']),
  },

  watch: {
    settings() {
      this.updateForm();
    },
  },

  created() {
    this.updateForm();
  },

  methods: {
    ...mapActions('user', [
      'updateSettings',
    ]),

    updateForm() {
      if (this.settings) this.form = this.settings;
    },

    async validateAndUpdateSettings() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Por favor preencha os campos corretamente.',
        });
        return;
      }
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
      this.readonly = true;
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 14px;
  color: rgba(0,0,0,0.4);
}
.q-field {
  font-size: 1.25em;
}
</style>

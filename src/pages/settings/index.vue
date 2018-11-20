<template>
  <q-page>
    <q-list link>
      <!-- <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Notificações</q-item-tile>
          <q-item-tile sublabel>Notify me aboumes that I downloaded</q-item-tile>
        </q-item-main>
        <q-item-side>
        </q-item-side>
      </q-item> -->
      <q-list-header>Aluguel</q-list-header>
      <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Quilometragem atual</q-item-tile>
          <q-item-tile sublabel>{{ form.car.km.actual }} km</q-item-tile>
          <q-popup-edit
            v-model="form.car.km.actual"
            persistent
            buttons
            label-set="Salvar"
            @save="validateAndUpdateSettings"
          >
            <q-input type="number" v-model="form.car.km.actual" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Quilometragem semanal permitida</q-item-tile>
          <q-item-tile sublabel>{{ form.car.km.allowed }} km</q-item-tile>
          <q-popup-edit
            v-model="form.car.km.allowed"
            persistent
            buttons
            label-set="Salvar"
            @save="validateAndUpdateSettings"
          >
            <q-input type="number" v-model="form.car.km.allowed" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Custo carro por semana</q-item-tile>
          <q-item-tile sublabel>R$ {{ form.rental.cost }}</q-item-tile>
          <q-popup-edit
            v-model="form.rental.cost"
            persistent
            buttons
            label-set="Salvar"
            @save="validateAndUpdateSettings"
          >
            <q-input type="number" v-model="form.rental.cost" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Custo por quilômetro excedido</q-item-tile>
          <q-item-tile sublabel>R$ {{ form.rental.exceeded }}</q-item-tile>
          <q-popup-edit
            v-model="form.rental.exceeded"
            persistent
            buttons
            label-set="Salvar"
            @save="validateAndUpdateSettings"
          >
            <q-input type="number" v-model="form.rental.exceeded" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Outros custos semanais</q-item-tile>
          <q-item-tile sublabel>R$ {{ form.costs }}</q-item-tile>
          <q-popup-edit
            v-model="form.costs"
            persistent
            buttons
            label-set="Salvar"
            @save="validateAndUpdateSettings"
          >
            <q-input type="number" v-model="form.costs" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side>
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Placa do veículo</q-item-tile>
          <q-item-tile sublabel>{{ form.car.plate }}</q-item-tile>
          <q-popup-edit
            v-model="form.car.plate"
            persistent
            buttons
            label-set="Salvar"
            @save="validateAndUpdateSettings"
          >
            <q-input
            type="text"
            v-model="form.car.plate"
            :maxlength="8"
            upper-case
            />
          </q-popup-edit>
        </q-item-main>
      </q-item>
    </q-list>
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
        await this.updateSettings({ settings: this.form });
        this.$q.notify({
          type: 'positive',
          message: 'Configurações atualizadas com sucesso',
        });
      } catch (err) {
        this.$log.error('validateAndUpdateSettings', err);
        this.$q.notify({
          message: 'Ocorreu um erro!',
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
</style>

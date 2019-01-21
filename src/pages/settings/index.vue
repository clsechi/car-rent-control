<template>
  <q-page>
    <q-list link>
      <!-- <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Notificações</q-item-tile>
          <q-item-tile sublabel>Notify me aboumes that I downloaded</q-item-tile>
        </q-item-main>
        <q-item-side/>
      </q-item> -->
      <q-list-header>Aluguel</q-list-header>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Custo do aluguel por semana</q-item-tile>
          <q-item-tile sublabel>R$ {{ form.rental.costs.week }}</q-item-tile>
          <q-popup-edit
            v-model="form.rental.costs.week"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-input v-model.number="form.rental.costs.week" type="number" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Limite de KMs</q-item-tile>
          <q-item-tile sublabel>Possui limite de quilometragem semanal</q-item-tile>
        </q-item-main>
        <q-item-side>
          <q-toggle v-model="form.rental.km.hasLimit"/>
        </q-item-side>
      </q-item>
      <div v-if="form.rental.km.hasLimit">
        <q-item tag="label">
          <q-item-side/>
          <q-item-main>
            <q-item-tile label>Quilometragem semanal permitida</q-item-tile>
            <q-item-tile sublabel>{{ form.rental.km.allowed | hasValue }} km</q-item-tile>
            <q-popup-edit
              v-model="form.rental.km.allowed"
              persistent
              buttons
              label-set="Salvar"
              @save="updateSettings"
            >
              <q-input v-model.number="form.rental.km.allowed" type="number" />
            </q-popup-edit>
          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-side/>
          <q-item-main>
            <q-item-tile label>Custo por KM excedido</q-item-tile>
            <q-item-tile sublabel>R$ {{ form.rental.costs.exceeded | hasValue }}</q-item-tile>
            <q-popup-edit
              v-model="form.rental.costs.exceeded"
              persistent
              buttons
              label-set="Salvar"
              @save="updateSettings"
            >
              <q-input v-model.number="form.rental.costs.exceeded" type="number" />
            </q-popup-edit>
          </q-item-main>
        </q-item>
      </div>
      <q-list-header>Carro</q-list-header>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Apelido</q-item-tile>
          <q-item-tile sublabel>{{ form.car.nickname }}</q-item-tile>
          <q-popup-edit
            v-model="form.car.nickname"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-input v-model="form.car.km.actual" type="number" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Quilometragem atual</q-item-tile>
          <q-item-tile sublabel>{{ form.car.km.actual | hasValue }} km</q-item-tile>
          <q-popup-edit
            v-model="form.car.km.actual"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-input v-model="form.car.km.actual" type="number" />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Placa do veículo</q-item-tile>
          <q-item-tile sublabel>{{ form.car.plate }}</q-item-tile>
          <q-popup-edit
            v-model="form.car.plate"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-input
              v-model.trim="form.car.plate"
              :maxlength="8"
              type="text"
              upper-case
            />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-list-header>Pessoal</q-list-header>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Outros custos semanais</q-item-tile>
          <q-item-tile sublabel>R$ {{ form.personal.costs }}</q-item-tile>
          <q-popup-edit
            v-model="form.personal.costs"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-input v-model.number="form.personal.costs" type="number"/>
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Horário começo do dia</q-item-tile>
          <q-item-tile sublabel>{{ form.personal.startHour | formatDate }}</q-item-tile>
          <q-popup-edit
            v-model="form.personal.startHour"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-datetime
              v-model="form.personal.startHour"
              :default-value="new Date()"
              type="time"
              popover
            />
          </q-popup-edit>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-side/>
        <q-item-main>
          <q-item-tile label>Horário fim do dia</q-item-tile>
          <q-item-tile sublabel>{{ form.personal.endHour | formatDate }}</q-item-tile>
          <q-popup-edit
            v-model="form.personal.endHour"
            persistent
            buttons
            label-set="Salvar"
            @save="updateSettings"
          >
            <q-datetime
              v-model="form.personal.endHour"
              :default-value="new Date()"
              type="time"
              popover
            />
          </q-popup-edit>
        </q-item-main>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

export default {
  name: 'IndexSettings',

  filters: {
    hasValue(value) {
      if (!value) return 0;
      return value;
    },

    formatDate(value) {
      return date.formatDate(value, 'HH:mm');
    },
  },

  data() {
    return {
      form: {
        car: {
          nickname: null,
          plate: null,
          km: {
            actual: null,
          },
        },
        rental: {
          costs: {
            week: null,
            exceeded: null,
          },
          km: {
            hasLimit: false,
            allowed: null,
          },
        },
        personal: {
          costs: null,
          startHour: null,
          endHour: null,
        },
      },
    };
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
      'setSettings',
    ]),

    updateForm() {
      if (this.settings) this.form = this.settings;
    },

    async updateSettings() {
      try {
        await this.setSettings(this.form);
      } catch (err) {
        this.$log.error('validateAndUpdateSettings', err);
        this.$q.notify({
          message: 'Ocorreu um erro!',
        });
      }
    },
  },
};
</script>

<style scoped>
</style>

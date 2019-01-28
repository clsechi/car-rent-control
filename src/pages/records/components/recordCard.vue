<template>
  <q-card class="card">
    <q-card-main class="card q-px-xs">
      <div class="row">
        <div class="col-2 flex flex-center">
          <q-icon
            :class="properties.icon.color"
            :name="properties.icon.name"
            class="card-icon"
            color="white"
          />
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-6 text-faded">
              {{ properties.title }}
            </div>
            <div class="col-5 flex justify-end text-faded">
              <div class="text-center">
                <div>{{ record.date | formatDate }}</div>
              </div>
            </div>
            <div class="col-1">
              <record-actions :record="record"/>
            </div>
          </div>
          <div class="row">
            <div class="col-11 q-mt-sm">
              <component
                :is="recordComponent"
                :record="record"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import { date } from 'quasar';
import recordActions from './recordActions.vue';

export default {
  name: 'recordCard',

  components: {
    recordActions,
    incomeRecord: () => import('./incomeRecord.vue'),
    expenseRecord: () => import('./expenseRecord.vue'),
    maintenanceRecord: () => import('./maintenanceRecord.vue'),
    refuelingRecord: () => import('./refuelingRecord.vue'),
  },

  filters: {
    formatDate(val) {
      return date.formatDate(val, 'DD/MMM');
    },
  },

  props: {
    record: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      properties: {
        icon: {
          name: '',
          color: '',
        },
        title: '',
      },
    };
  },

  computed: {
    recordComponent() {
      return `${this.record.type.toLowerCase()}Record`;
    },
  },

  created() {
    this.defineType();
  },

  methods: {
    defineType() {
      const types = {
        INCOME: {
          icon: {
            name: 'attach_money',
            color: 'bg-green',
          },
          title: 'Ganho',
        },
        EXPENSE: {
          icon: {
            name: 'money_off',
            color: 'bg-red',
          },
          title: 'Despesa',
        },
        MAINTENANCE: {
          icon: {
            name: 'local_gas_station',
            color: 'bg-orange',
          },
          title: 'Manutenção',
        },
        REFUELING: {
          icon: {
            name: 'build',
            color: 'bg-brown',
          },
          title: 'Abastecimento',
        },
      };
      this.properties = types[this.record.type];
    },
  },
};
</script>

<style lang="stylus" scoped>

@import '~variables'

.card {
  font-size: 1.1rem
}
.card-icon {
  padding: 4px
  font-size: 2em
  border-radius: 100%
}
</style>

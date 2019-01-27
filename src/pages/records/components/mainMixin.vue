<script>
import incomeForm from './incomeForm.vue';
import expenseForm from './expenseForm.vue';
import maintenanceForm from './maintenanceForm.vue';
import refuelingForm from './refuelingForm.vue';

export default {
  name: 'mainMixin',

  components: {
    incomeForm,
    expenseForm,
    maintenanceForm,
    refuelingForm,
  },

  computed: {
    recordType() {
      return `${this.$route.meta.componentPrefix}Form`;
    },
  },
};
</script>

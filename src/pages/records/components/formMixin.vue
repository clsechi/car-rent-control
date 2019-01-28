<script>
import { mapGetters, mapActions } from 'vuex';
import confirmButton from './confirmButton.vue';

export default {
  name: 'Form',

  components: {
    confirmButton,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapGetters('record', ['records']),
  },

  created() {
    if (this.id) this.findRecord();
  },

  methods: {
    ...mapActions('record', [
      'createRecord',
      'updateRecord',
      'getRecords',
    ]),

    findRecord() {
      const data = this.records.find(record => record.id === this.id);
      if (!data) {
        this.$q.notify('Registro não encontrado!');
      } else {
        this.form = data;
      }
    },

    async validateAndCreateRecord() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Por favor preencha os campos corretamente.',
        });
        return;
      }
      this.loading = true;
      try {
        await this.getRecords();
        if (this.id) {
          await this.updateRecord(this.form);
        } else {
          await this.createRecord(this.form);
        }
        this.$q.notify({
          type: 'positive',
          message: this.message,
        });
        this.$router.go(-1);
      } catch (err) {
        this.$log.error('validateAndCreateRecord', err);
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

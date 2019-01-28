<template>
  <q-icon name="more_vert" class="flex justify-center">
    <q-popover>
      <q-list>
        <q-item v-close-overlay>
          <q-btn
            round
            icon="edit"
            color="secondary"
            @click="$router.push({ name: 'edit', params: {id: record.id}})"
          />
        </q-item>
        <q-item v-close-overlay>
          <q-btn
            round
            icon="delete"
            color="negative"
            @click="confirmDelete(record)"
          />
        </q-item>
      </q-list>
    </q-popover>
  </q-icon>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'recordActions',

  props: {
    record: {
      required: true,
      type: Object,
    },
  },

  methods: {
    ...mapActions('record', [
      'deleteRecord',
    ]),
    async confirmDelete(record) {
      try {
        await this.$q.dialog({
          title: 'Confirmação',
          message: 'Excluir registro?',
          ok: 'Excluir',
          cancel: 'Cancelar',
        });
        this.deleteActualRecord(record);
      } catch (err) {} // eslint-disable-line
    },

    async deleteActualRecord(record) {
      try {
        await this.deleteRecord(record);
        this.$q.notify({
          type: 'info',
          message: 'Registro excluído',
        });
      } catch (err) {
        this.$log.error('deleteActualRecord', err);
        this.$q.notify({
          message: 'Ocorreu um erro!',
        });
      }
    },
  },
};
</script>

<style>

</style>

<template>
  <div class="flex justify-center">
    <q-btn
      :label="label"
      :loading="loading"
      class="q-mt-sm confirm-button"
      color="positive"
      @click="$emit('confirmed')"
    />
  </div>
</template>

<script>
export default {
  name: 'confirmButton',

  props: {
    label: {
      required: true,
      type: String,
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },
};
</script>

<style>
.confirm-button {
  width: 50vw;
}
</style>

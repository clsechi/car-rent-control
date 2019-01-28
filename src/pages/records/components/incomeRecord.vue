<template>
  <div class="row flex items-center">
    <div class="col-6 text-weight-medium">
      {{ record.description }}
    </div>
    <div class="col-6 text-weight-medium flex justify-end text-positive">
      R$ {{ record.value.toFixed(2) }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'incomeRecord',

  props: {
    record: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style>
</style>

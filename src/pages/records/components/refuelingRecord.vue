<template>
  <div class="row q-subheading items-center gutter-xs">
    <div class="col-xs-12 col-md-auto">
      Distância: <span class="text-weight-bold">{{ record.distance }} km</span>
    </div>
    <div class="col-xs-12 col-md-auto">
      Gastos:
      <span class="text-weight-bold">
        R$ {{ (record.expenses.fuel + record.expenses.others).toFixed(2) }}
      </span>
    </div>
    <div class="col-xs-12 col-md-auto">
      Ganhos:
      <span class="text-weight-bold">
        R$ {{ record.earnings.toFixed(2) }}
      </span>
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

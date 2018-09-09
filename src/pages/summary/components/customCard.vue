<template>
    <q-card
      square
      :color="color"
    >
      <q-card-main class="row">
        <div class="col-9">
          <div class="card-text">{{ description }}</div>
          <div class="card-text q-display-1 text-weight-medium">{{ value }}</div>
        </div>
        <div class="col-auto">
          <q-icon
          :name="icon"
          size="3.63rem"
          />
        </div>
      </q-card-main>
    </q-card>
</template>

<script>
export default {
  name: 'CustomCard',

  props: {
    description: {
      required: true,
    },
    value: {
      required: true,
    },
    color: {
      required: true,
    },
    icon: {
      required: true,
    },
  },
};
</script>

<style>
</style>

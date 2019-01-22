<template>
  <q-page padding>
    <div class="text-center">
      <p class="q-headline">Bem-vindo {{ profile.displayName.split(' ')[0] }}</p>
      <p class="q-subheading">
        Antes de começar a organizar o seu aluguel, precisamos configurar o seu perfil.
      </p>
    </div>
    <q-stepper ref="stepper" vertical>
      <keep-alive v-for="(step, index) in steps" :key="index">
        <q-step
          :default="step.default"
          :title="step.title"
          :error="hasError(index)"
        >
          <component
            :is="step.component"
            @update:completed="val => updateCompleted(index, val)"
            @update:error="val => updateError(index, val)"
            @previous="previousStep"
            @next="nextStep"
          />
        </q-step>
      </keep-alive>
      <q-step title="Pronto!">
        Parabéns, agora seu perfil esta completo!
        <q-stepper-navigation class="q-mt-md">
          <q-btn
            color="secondary"
            flat
            label="Voltar"
            @click="previousStep"
          />
          <q-btn
            color="secondary"
            label="Concluir"
            @click="finalize"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import rentalInputs from './components/rentalInputs.vue';
import carInputs from './components/carInputs.vue';

export default {
  // name: 'PageName',

  components: {
    rentalInputs,
    carInputs,
    personalInputs: () => import('./components/personalInputs.vue'),
  },

  data() {
    return {
      steps: [
        {
          title: 'Configurar o Aluguel',
          component: 'rentalInputs',
          default: true,
          error: false,
          completed: false,
        },
        {
          title: 'Configurar seu Carro',
          component: 'carInputs',
          default: false,
          error: false,
          completed: false,
        },
        {
          title: 'Detalhes Pessoais',
          component: 'personalInputs',
          default: false,
          error: false,
          completed: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters('user', ['profile']),

    canFinalize() {
      return this.steps.reduce((acc, step) => step.completed);
    },
  },

  methods: {
    hasError(index) {
      return this.steps[index].error;
    },

    updateError(index, val) {
      this.steps[index].error = val;
    },

    updateCompleted(index, val) {
      this.steps[index].completed = val;
    },

    previousStep() {
      this.$refs.stepper.previous();
    },

    nextStep() {
      this.$refs.stepper.next();
    },

    finalize() {
      if (!this.canFinalize) {
        this.$q.notify({
          message: 'Por favor reveja as etapas.',
        });
      } else {
        this.$router.push({ name: 'summary' });
      }
    },
  },
};
</script>

<style>
</style>

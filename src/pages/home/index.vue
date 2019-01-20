<template>
  <q-page>
    <nav class="negative">
      <div class="row">
        <div class="col-6 flex items-center logo">
          Rent
        </div>
        <div class="col-6 flex justify-end">
          <q-btn
            flat
            label="Entrar"
            @click="$router.push({ name: 'login' })"
          />
        </div>
      </div>
    </nav>
    <section class="first-section">
      <h2 class="text-weight-medium">
        O controle de metas que você precisa
      </h2>
      <p>
        Saiba de forma rápida qual a meta para o seu dia.
      </p>
      <p>
        Tenha em mãos seus histórico de gastos.
      </p>
      <start-button class="q-mb-md"/>
    </section>
    <section class="second-section negative">
      <h2 class="text-weight-medium">
        Um app que você não precisa baixar
      </h2>
      <p>
        Não ocupa espaço no seu celular.
      </p>
      <p>
        Crie um atalho na sua tela inicial e pronto.
      </p>
    </section>
    <section class="third-section">
      <h2 class="text-weight-medium">
        Controle seus gastos com corridas de forma simples
      </h2>
      <ul v-for="goal in goals" :key="goal">
        <li class="goal-item"> {{ goal }} </li>
      </ul>
      <start-button class="q-my-sm"/>
    </section>
    <footer class="text-center float-bottom q-py-md negative">
      Made with <span>❤</span> by @clsechi
    </footer>
  </q-page>
</template>

<script>
import startButton from './components/startButton.vue';

export default {
  name: 'home',

  components: {
    startButton,
  },

  data() {
    return {
      goals: [
        'Meta diária',
        'Dias restantes',
        'Precisa pagar',
        'Pode dirigir',
        'Gastou totais',
        'Ganhos totais',
        'Lucro',
      ],
    };
  },
};
</script>

<style scoped lang="stylus">
@import '~variables'

section {
  padding: 15px 24px
}

.negative {
  background-color: $primary
  color: white
}

nav {
  padding: 7px 14px
  border-radius: 0px
}

.logo {
  font-size: 1.6rem
}

footer span {
  color: #e44242
}

section p {
  padding: 5px 0px
}

section p, .goal-item {
  font-size: 1.25em
}
</style>

<template>
  <div>
    <h1 class="display-3 font-weight-light mb-4">
      Negocie e Consulte suas Ações
    </h1>
    <v-sheet :elevation="6" class="pa-2 primary">
      <v-icon class="white--text mr-3">info</v-icon>
      <span class="headline white--text font-weight-light"
        >Você pode 'Salvar & Carregar' os dados</span
      >
    </v-sheet>
    <v-sheet :elevation="6" class="pa-2 success darken-1 mt-3">
      <v-icon class="white--text mr-3">info</v-icon>
      <span class="headline white--text font-weight-light"
        >Clique em 'Finalizar Dia' para iniciar um novo dia!</span
      >
    </v-sheet>
    <v-divider class="my-4"></v-divider>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="company.name"
              :rules="nameRules"
              :counter="10"
              label="Nome da Empresa"
              required
            ></v-text-field>
          </v-col>
          <v-btn class="mr-4" @click="submit"> Cadastrar </v-btn>
          <v-btn @click="reset"> Limpar </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <p class="display-1"><strong>Seu Saldo:</strong>{{ funds | currency }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: {
        name: "",
      },
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
  },
  methods: {
    submit() {},
    reset() {
      this.company = [];
    },
  },
};
</script>

<style>
</style>

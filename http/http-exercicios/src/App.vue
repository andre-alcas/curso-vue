<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :variant="mensagem.tipo">
			{{ mensagem.texto }}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Informe o nome">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Email:">
				<b-form-input type="text" size="lg" v-model="usuario.email" placeholder="Informe o email">
				</b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
			<b-button @click="obterUsuarios" size="lg" variant="success" class="ml-2">Obter Usuários</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong>{{ usuario.nome }}<br>
				<strong>Email: </strong>{{ usuario.email }}<br>
				<strong>ID: </strong>{{ id }}<br>
				<b-button variant="warning" size="lg" @click="carregar(id)">Carregar</b-button>
				<b-button variant="danger" size="lg" class="ml-2" @click="excluir(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	/* 	created() {
		  this.$http.post('usuarios.json', {
			  nome: 'Maria',
			  email: 'maria_maria@gmail.com',
		  }).then((res) => console.log(res))
	  } */
	data() {
		return {
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: "",
				email: "",
			},
		};
	},
	methods: {
		limpar() {
			this.id = null
			this.usuario.nome = ''
			this.usuario.email = ''
			this.mensagens = []
		},
		carregar(id) {
			this.id = id
			this.usuario = { ...this.usuarios[id] }
		},
		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
				.then(() => this.limpar())
				.catch(err => {
					this.mensagens.push({
						texto: 'Problema para excluir!',
						tipo: 'danger'
					})
				})
				.then(() => this.obterUsuarios())
		},
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
				.then(() => {
					this.limpar()
					this.mensagens.push({
						texto: 'Operação realizada com sucesso!',
						tipo: 'success'
					})
				})
				.then(() => this.obterUsuarios())
			/* this.$http.post('usuarios.json', this.usuario)
				.then(() => this.limpar()) */
		},
		obterUsuarios() {
			this.$http('usuarios.json')
				.then(res => {
					this.usuarios = res.data
					//console.log(this.usuarios)
				})
		}
	}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>

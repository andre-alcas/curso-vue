new Vue({
	el: '#desafio',
	data: {
		exibir: false,
		array: ['Pedro', 'Bia', 'Ana', 'Rebeca'],
		livro: [
			{titulo: 'O Senhor dos Anéis',autor: 'J.R.R. Tolkiens',volume: '3' },
		],
		aluno: {
			id: 10,
			nome: 'Maria',
			notas: [7.67, 8.33, 6.98, 9.21]
		},
		pessoas: [
			{nome: 'Pedro',idade: 18,altura: 1.80},
			{nome: 'Bia',idade: 19,altura: 1.65},
			{nome: 'Ana',idade: 20,altura: 1.68},
		]
	}
});

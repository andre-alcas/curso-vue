new Vue({
    el: '#desafio',
    data: {
        nome: 'André',
        idade: '32',
        link: 'https://logodownload.org/wp-content/uploads/2014/09/google-logo-0.png'
    },
    methods:{
        idade3(){
            return this.idade*3
        },
        random(){
            return Math.random()

        },
        inserirNome(event){
            this.nome = event.target.value

        }
    }
})
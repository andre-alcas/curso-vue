new Vue({
    el: '#desafio',
    data: {
        valor: 0,
    },
    methods:{
        aumentar1(){
            this.valor++
        },
        aumentar5(){
            this.valor +=5
        }

    },
    computed:{
        resultado(){
            console.log('Metodo resultado chamado...')
            return this.valor == 37 ? 'Valor igual':'Valor diferente'
        }
    },
    watch:{
        resultado(novo,antigo){
            setTimeout(() =>{
                this.valor = 0
            },5000)
        }

    }
});
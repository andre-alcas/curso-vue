new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods:{
        exibirAlerta(){
            alert("Estou te alertando!")
        },
        setData(event){
            this.valor = event.target.value
        }
    }
})
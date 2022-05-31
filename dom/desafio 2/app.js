new Vue({
    el: '#desafio',
    data: {
        valor: 'hello'
    },
    methods:{
        exibirAlerta(){
            alert("Estou te alertando!")
        },
        setData(event){
            event.target.value

        }
    }
})
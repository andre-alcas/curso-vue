new Vue({
    el: '#desafio',
    data: {
        valor: 'hello'
    },
    methods:{
        exibirAlerta(){
            alert("Estu te alertando!")
        },
        setData(event){
            event.target.value

        }
    }
})
<template>
    <div class="usuario-detalhe">
        <h3>Usuário Detalhe</h3>
        <!-- <p><strong>Código:</strong> {{ id }} </p> -->
        <p><strong>Código:</strong> {{ $route.params.id }} </p>
        <!-- <router-link tag="button" primario :to="`/usuario/${$route.params.id}/editar`">
            Editar</router-link> -->
        <router-link tag="button" primario :to="{
            name: 'editarUsuario', params: { id: $route.params.id },
            query: { completo: true, lingua: 'pt' },
            hash: '#rodape'
        }">
            Editar</router-link>
    </div>
</template>

<script>
export default {
    /* props: ['id'], */
    beforeRouteEnter(to, from, next) {
        console.log('dentro do componente -> usuario detalhe')
        //componente ainda não foi criado por isso não é possivel acessar suas variaveis, 
        //mas dá pra acessar conforme abaixo:
        /* next(vm => {
            console.log(vm.$route.params.id)
        }) */
        const autenticado = true
        /* autenticado ? next() : next(vm => {
            console.log(vm.$route.params.id)
        }) */
        autenticado ? next() : next(false)
    }
}
</script>

<style>
</style>
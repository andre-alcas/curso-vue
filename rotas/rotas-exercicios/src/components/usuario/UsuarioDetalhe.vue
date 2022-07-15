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
}
</script>

<style>
</style>
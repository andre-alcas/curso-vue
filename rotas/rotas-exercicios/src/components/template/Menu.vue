<template>
    <nav class="menu">
        <ul>
            <li>
                <router-link to="/" tag="li" active-class="active" exact><a>Início</a></router-link>
            </li>
            <li>
                <router-link to="/usuario" tag="li" active-class="active"><a>Usuário</a></router-link>
            </li>
        </ul>
    </nav>

</template>

<script>
export default {

}
</script>

<style>
</style>
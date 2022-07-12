<template>
	<div id="app">
		<h1>Rotas com VueRouter</h1>
		<router-view />
	</div>
</template>

<script>
export default {

}
</script>

<style>
body {
	margin: 0;
}

#app {
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;

	color: #fff;
	background: linear-gradient(to right, rgba(83, 105, 118), rgb(41, 46, 73));

}
</style>

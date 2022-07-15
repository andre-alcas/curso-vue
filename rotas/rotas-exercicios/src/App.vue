<template>
	<div id="app">
		<h1>Rotas com VueRouter</h1>
		<!-- <Menu /> -->
		<router-view name="menu"></router-view>
		<transition mode="out-in" enter-active-class="animated rubberBand" leave-active-class="animated rollOut">
			<router-view />
		</transition>

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

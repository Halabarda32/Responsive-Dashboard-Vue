<template>
	<v-app class="grey lighten-4">
		<NavbarItem />
		<v-main class="mx-4 mb-4">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import NavbarItem from './components/NavbarItem.vue'
export default {
	name: 'App',
	components: { NavbarItem },
	data: () => ({
		//
	}),
}
</script>

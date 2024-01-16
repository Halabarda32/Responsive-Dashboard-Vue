<template>
	<nav>
		<v-toolbar flat app>
			<v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">Dashboard</span>
				<span> app</span>
			</v-toolbar-title>
			<v-spacer />
			<v-btn flat text color="grey">
				<router-link class="no-underline grey--text" to="/logout"><span>Sign Out</span></router-link>
				<v-icon right>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-toolbar>
		<v-navigation-drawer v-model="drawer" temporary app>
			<v-list dense>
				<router-link class="no-underline" v-for="link in links" :key="link.title" :to="link.link">
					<v-list-item link>
						<v-list-item-icon>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ link.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</router-link>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			links: [
				{
					title: 'Dashboard',
					icon: 'mdi-view-dashboard',
					link: '/',
				},
				{
					title: 'Add Data',
					icon: 'mdi-plus',
					link: '/add',
				},
				{
					title: 'Edit Data',
					icon: 'mdi-pencil',
					link: '/edit',
				},
			],
		}
	},
}
</script>

<style scoped>
.no-underline {
	text-decoration: none;
}
</style>

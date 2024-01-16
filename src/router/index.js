import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import FormView from '../views/FormView.vue'
import DataView from '../views/DataView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: DashboardView,
	},
	{
		path: '/add',
		name: 'form',
		component: FormView,
	},
	{
		path: '/edit',
		name: 'edit',
		component: DataView,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router

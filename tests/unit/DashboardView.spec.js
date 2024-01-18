import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()

const mockStore = {
	state: {
		loading: false,
	},
	getters: {
		SetCharacters: [],
	},
	actions: {
		fetchCharacters: jest.fn(),
	},
}

describe('DashboardView.vue', () => {
	let wrapper

	beforeEach(() => {
		wrapper = mount(DashboardView, {
			localVue,
			router,
			mocks: {
				$store: mockStore,
			},
		})
	})

	it('renders without errors', () => {
		expect(wrapper.exists()).toBe(true)
	})
})

import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import FormView from '@/views/FormView.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()

describe('FormView.vue', () => {
	let wrapper

	beforeEach(() => {
		wrapper = mount(FormView, {
			localVue,
			router,
		})
	})

	it('validates form submission', async () => {
		expect(wrapper.vm.newCharacter.name).toBe('')
		expect(wrapper.vm.newCharacter.school).toBe('')
		expect(wrapper.vm.newCharacter.birthday).toBeNull()
		expect(wrapper.vm.newCharacter.damageType).toBe('')

		wrapper.vm.newCharacter.name = 'Jan Kowalski'
		wrapper.vm.newCharacter.school = 'Test'
		wrapper.vm.newCharacter.birthday = '2000-01-01'
		wrapper.vm.newCharacter.damageType = 'Test'

		await wrapper.vm.$nextTick()

		wrapper.vm.$options.watch.menu.call(wrapper.vm, wrapper.vm.menu)

		await wrapper.vm.$nextTick()

		expect(wrapper.vm.isFormValid).toBe(true)
	})
})

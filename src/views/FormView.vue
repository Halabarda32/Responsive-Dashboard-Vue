<template>
	<v-container class="elevation-12">
		<v-form @submit.prevent="saveNewCharacter">
			<v-text-field v-model="newCharacter.name" label="Name" :rules="nameRules"></v-text-field>
			<v-text-field v-model="newCharacter.school" label="School" :rules="schoolRules"></v-text-field>
			<div>
				<v-menu
					ref="menu"
					v-model="menu"
					:close-on-content-click="false"
					transition="scale-transition"
					offset-y
					min-width="auto">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="newCharacter.birthday"
							:rules="birthdayRules"
							label="Birthday date"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"></v-text-field>
					</template>
					<v-date-picker
						v-model="newCharacter.birthday"
						:active-picker.sync="activePicker"
						:max="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10)"
						min="1950-01-01"
						@change="save"
						label="Select Birthday"
						no-year></v-date-picker>
				</v-menu>
			</div>
			<v-text-field v-model="newCharacter.damageType" label="Damage Type" :rules="damageTypeRules"></v-text-field>
			<v-text-field
				v-model="newCharacter.photoUrl"
				label="Character Photo URL (800x800 Images Only)"
				:rules="photoUrlRules"></v-text-field>
			<v-text-field
				v-model="newCharacter.imageSchool"
				label="School Symbol URL (800x800 Images Only)"
				:rules="imageSchoolRules"></v-text-field>
			<v-btn type="submit" color="primary" :disabled="!isFormValid">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import { ValidationMixin } from '@/helpers/Validation'

export default {
	mixins: [ValidationMixin],
	data() {
		return {
			newCharacter: {
				name: '',
				school: '',
				birthday: null,
				damageType: '',
				_id: Math.floor(Math.random() * 100),
				photoUrl: '',
				image: '',
				imageSchool: '',
				formattedBirthday: '',
			},
			activePicker: null,
			date: null,
			menu: false,
		}
	},
	computed: {
		isFormValid() {
			return (
				this.newCharacter.name && this.newCharacter.school && this.newCharacter.birthday && this.newCharacter.damageType
			)
		},
	},
	watch: {
		menu(val) {
			val && setTimeout(() => (this.activePicker = 'YEAR'))
		},
	},
	methods: {
		saveNewCharacter() {
			if (this.newCharacter.birthday) {
				const selectedDate = new Date(this.newCharacter.birthday)
				const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
				this.newCharacter.birthday = formattedDate
			}
			this.$store.dispatch('addNewCharacter', this.newCharacter)

			this.newCharacter = {
				name: '',
				school: '',
				birthday: null,
				damageType: '',
				_id: Math.floor(Math.random() * 100),
				photoUrl: '',
				image: '',
				imageSchool: '',
			}

			if (this.$route.name !== 'dashboard') {
				this.$router.push({ name: 'dashboard' })
			}
		},
		save(date) {
			this.$refs.menu.save(date)
		},
	},
}
</script>

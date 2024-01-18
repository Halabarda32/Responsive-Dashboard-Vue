<template>
	<div class="content">
		<v-container justify="center" class="my-5">
			<div class="custom-header">
				<h1 class="light-blue--text my-5">Add Character</h1>
				<div class="custom-underline"></div>
			</div>
			<div>
				<v-img contain src="../assets/blob/blob1.png" class="blob blob-one"></v-img>
				<v-img contain src="../assets/blob/blob2.png" class="blob blob-two"></v-img>
			</div>
			<v-row justify="center">
				<v-col cols="12" xs="12" sm="10" md="8" lg="6" xl="4">
					<v-card class="elevation-12 px-8 py-8 my-5">
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
							<v-text-field
								v-model="newCharacter.damageType"
								label="Damage Type"
								:rules="damageTypeRules"></v-text-field>
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
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
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
			if (
				this.newCharacter.name &&
				this.newCharacter.school &&
				this.newCharacter.birthday !== null &&
				this.newCharacter.damageType
			) {
				return true
			} else {
				return false
			}
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

<style scoped>
/* .blob-two {
	top: -5%;
	left: -6%;
	width: 880px;
	animation: rotate-left 135s infinite linear;
} */
</style>

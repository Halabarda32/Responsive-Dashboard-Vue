<template>
	<v-container>
		<v-form @submit.prevent="saveNewCharacter">
			<v-text-field v-model="newCharacter.name" label="Name"></v-text-field>
			<v-text-field v-model="newCharacter.school" label="School"></v-text-field>
			<v-text-field v-model="newCharacter.birthday" label="Birthday"></v-text-field>
			<v-text-field v-model="newCharacter.damageType" label="Damage Type"></v-text-field>
			<v-text-field v-model="newCharacter.photoUrl" label="Character Photo URL (800x800 Images Only)"></v-text-field>
			<v-text-field v-model="newCharacter.imageSchool" label="School Symbol URL (800x800 Images Only)"></v-text-field>

			<v-btn type="submit" color="primary">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			newCharacter: {
				name: '',
				school: '',
				birthday: '',
				damageType: '',
				_id: Math.floor(Math.random() * 100),
				photoUrl: '',
				image: '',
				imageSchool: '',
			},
		}
	},
	methods: {
		saveNewCharacter() {
			this.$store.dispatch('addNewCharacter', this.newCharacter)

			this.newCharacter = {
				name: '',
				school: '',
				birthday: '',
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
	},
}
</script>

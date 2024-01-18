<template>
	<v-dialog v-model="localShowDialog" max-width="600">
		<v-card>
			<v-card-title class="blue--text">Edit Character</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="saveEdit">
					<v-text-field v-model="localEditedCharacter.name" label="Name" :rules="nameRules"></v-text-field>
					<v-text-field v-model="localEditedCharacter.photoUrl" label="Photo" :rules="photoUrlRules"></v-text-field>
					<v-text-field v-model="localEditedCharacter.school" label="School" :rules="schoolRules"></v-text-field>
					<v-text-field
						v-model="localEditedCharacter.imageSchool"
						label="School Image"
						:rules="imageSchoolRules"></v-text-field>
					<v-text-field v-model="localEditedCharacter.birthday" label="Birthday" :rules="birthdayRules"></v-text-field>
					<v-text-field
						v-model="localEditedCharacter.damageType"
						label="Damage Type"
						:rules="damageTypeRules"></v-text-field>

					<v-btn type="submit" color="primary" class="mr-5">Save</v-btn>
					<v-btn @click="cancelEdit">Cancel</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { ValidationMixin } from '@/helpers/Validation'

export default {
	mixins: [ValidationMixin],
	props: { showDialog: Boolean, editedCharacter: Object },
	data() {
		return {
			localShowDialog: this.showDialog,
			localEditedCharacter: { ...this.editedCharacter },
		}
	},
	watch: {
		showDialog(newValue) {
			this.localShowDialog = newValue
		},
		editedCharacter(newValue) {
			this.localEditedCharacter = { ...newValue }
		},
	},
	methods: {
		saveEdit() {
			this.$emit('save-edit', this.localEditedCharacter)
			this.$emit('close-edit-dialog')
		},
		cancelEdit() {
			this.$emit('close-edit-dialog')
		},
	},
}
</script>

<style></style>

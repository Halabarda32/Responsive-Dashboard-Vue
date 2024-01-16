<template>
	<v-dialog v-model="localShowDialog" max-width="600">
		<v-card>
			<v-card-title>Edit Character</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="saveEdit">
					<v-text-field v-model="localEditedCharacter.name" label="Name"></v-text-field>
					<v-text-field v-model="localEditedCharacter.school" label="School"></v-text-field>
					<v-text-field v-model="localEditedCharacter.birthday" label="Birthday"></v-text-field>
					<v-text-field v-model="localEditedCharacter.damageType" label="Damage Type"></v-text-field>

					<v-btn type="submit" color="primary">Save</v-btn>
					<v-btn @click="cancelEdit">Cancel</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['showDialog', 'editedCharacter'],
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

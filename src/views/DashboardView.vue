<template>
	<v-container>
		<v-overlay :value="isLoading">
			<v-progress-circular indeterminate color="primary"></v-progress-circular>
		</v-overlay>

		<EditDialog
			:show-dialog="editDialog"
			:edited-character="editedCharacter"
			@save-edit="saveEdit"
			@close-edit-dialog="closeEditDialog">
		</EditDialog>

		<DataTable
			:items="characters"
			:headers="headers"
			:search="search"
			:loading="isLoading"
			:footer-props="{
				showFirstLastPage: true,
				'items-per-page-options': [10, 30, 100, { text: 'All', value: -1 }],
			}"
			:open-edit-dialog="openEditDialog"
			:update-loading="updateLoading"
			:image-headers="imageHeaders">
		</DataTable>
	</v-container>
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import EditDialog from '@/components/EditDialog.vue'
export default {
	components: {
		DataTable,
		EditDialog,
	},
	data() {
		return {
			charactersData: [],
			headers: [
				{ text: 'Edit', value: 'edit' },
				{ text: 'Name', value: 'name' },
				{ text: 'Photo', value: 'photoUrl' },
				{ text: 'Birthday', value: 'birthday' },
				{ text: 'School', value: 'school' },
				{ text: 'School Symbol', value: 'imageSchool' },
				{ text: 'Damage Type', value: 'damageType' },
			],
			imageHeaders: [
				{ text: 'Photo', value: 'photoUrl' },
				{ text: 'Image', value: 'image' },
				{ text: 'School Image', value: 'imageSchool' },
			],
			search: '',
			currentPage: 1,
			perPage: 200,
			totalPages: 0,
			loading: true,
			selectedCharacter: null,
			editDialog: false,
			editedCharacter: {
				_id: '',
				name: '',
				school: '',
				birthday: '',
				damageType: '',
			},
		}
	},
	computed: {
		characters() {
			return this.$store.getters.SetCharacters
		},
		isLoading() {
			const loading = this.$store.getters.isloading
			return loading
		},
	},
	created() {
		this.fetchCharacters()
		this.selectedCharacter = this.$route.params.selectedCharacter || null
	},
	watch: {
		currentPage: 'fetchCharacters',
		perPage: 'fetchCharacters',
		'$route.params.selectedCharacter'(newCharacter) {
			this.selectedCharacter = newCharacter
		},
	},
	methods: {
		fetchCharacters() {
			const { currentPage, perPage } = this

			this.$store.dispatch('fetchCharacters', { currentPage, perPage }).then(() => {
				this.charactersData = [...this.$store.getters.SetCharacters]
			})
		},
		openEditDialog(character) {
			this.editedCharacter = { ...character }
			this.editDialog = true
		},
		cancelEdit() {
			this.editDialog = false
		},
		saveEdit(editedCharacter) {
			this.$store.dispatch('editCharacter', editedCharacter)
			this.editDialog = false
		},
		closeEditDialog() {
			this.editDialog = false
		},
	},
}
</script>

<style></style>

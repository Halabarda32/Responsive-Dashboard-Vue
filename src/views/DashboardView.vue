<template>
	<v-container>
		<EditDialog
			:show-dialog="editDialog"
			:edited-character="editedCharacter"
			@save-edit="saveEdit"
			@close-edit-dialog="closeEditDialog"></EditDialog>

		<DataTable
			:items="characters"
			:headers="headers"
			:search="search"
			:loading="SetIsLoading"
			:footer-props="footerProps"
			:open-edit-dialog="openEditDialog"
			:image-headers="imageHeaders"></DataTable>
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
			charactersData: [],
			selectedCharacterId: null,
			search: '',
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
		SetIsLoading() {
			return this.$store.state.loading
		},
		footerProps() {
			return {
				showFirstLastPage: true,
				'items-per-page-options': [10, 30, 100, { text: 'All', value: -1 }],
			}
		},
	},
	created() {
		this.fetchCharacters()
		this.selectedCharacterId = this.$route.params.selectedCharacter || null
		this.initializeData()
	},
	watch: {
		'$route.params.selectedCharacter'(newCharacter) {
			this.selectedCharacterId = newCharacter
		},
	},
	methods: {
		async fetchCharacters() {
			try {
				const { currentPage, perPage } = this
				await this.$store.dispatch('fetchCharacters', { currentPage, perPage })
				this.charactersData = [...this.$store.getters.SetCharacters]
			} catch (error) {
				console.error('Error fetching characters:', error)
			}
		},
		openEditDialog(character) {
			this.editedCharacter = { ...character }
			this.editDialog = true
		},
		saveEdit(editedCharacter) {
			this.$store.dispatch('editCharacter', editedCharacter)
			this.editDialog = false
		},
		closeEditDialog() {
			this.editDialog = false
		},
		initializeData() {
			this.editedCharacter = {
				_id: '',
				name: '',
				school: '',
				birthday: '',
				damageType: '',
			}
		},
	},
}
</script>

<style></style>

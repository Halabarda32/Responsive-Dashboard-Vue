<template>
	<div class="content">
		<v-container justify="center" class="my-5">
			<div class="custom-header">
				<h1 class="light-blue--text my-5">Character Table</h1>
				<div class="custom-underline"></div>
			</div>
			<div>
				<v-img contain src="../assets/blob/blob1.png" class="blob blob-one"></v-img>
				<v-img contain src="../assets/blob/blob2.png" class="blob blob-two"></v-img>
			</div>
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
	</div>
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

<style>
.content {
	position: relative;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
}

.blob {
	position: absolute;
	top: -1%;
	left: 65%;
	width: 700px;
	z-index: -10;
}

.blob-one {
	animation: rotate-right 120s infinite linear;
}

.blob-two {
	top: 22%;
	left: -4%;
	animation: rotate-left 135s infinite linear;
}

.custom-header {
	position: relative;
}

.custom-underline {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 8%;
	height: 4px;
	background-color: #b6dcf7;
}

@keyframes rotate-right {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes rotate-left {
	from {
		transform: rotate(360deg);
	}
	to {
		transform: rotate(0deg);
	}
}
</style>

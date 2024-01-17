<template>
	<v-container>
		<v-overlay :value="loading">
			<v-progress-circular indeterminate color="primary"></v-progress-circular>
		</v-overlay>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:footer-props="footerProps"
			:items="items"
			item-key="_id"
			show-select
			class="elevation-12">
			<template v-slot:top></template>
			<template v-for="header in headers" :slot="`item.${header.value}`" scope="props">
				<td :key="props.item._id + header.value">
					<template v-if="header.value === 'photoUrl' || header.value === 'imageSchool'">
						<v-text-field
							v-if="isEditing(header.value)"
							v-model="props.item[header.value]"
							@blur="saveEdit"
							dense></v-text-field>
						<span v-else-if="props.item[header.value]">
							<v-img
								:src="props.item[header.value]"
								width="50"
								height="50"
								@click.stop="startEditing(header.value)"></v-img>
						</span>
						<span v-else>No data</span>
					</template>
					<template v-else>
						<v-text-field
							v-if="isEditing(header.value)"
							v-model="props.item[header.value]"
							@blur="saveEdit"
							dense></v-text-field>
						<div v-else-if="header.value !== 'edit'" @click="startEditing(header.value)">
							{{ props.item[header.value] }}
						</div>
						<v-btn v-else @click.stop="openEditDialog(props.item)" icon>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</template>
				</td>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
export default {
	props: {
		items: Array,
		headers: Array,
		footerProps: Object,
		search: String,
		loading: Boolean,
		openEditDialog: Function,
		imageHeaders: Array,
	},
	data() {
		return {
			selected: [],
			editingField: null,
		}
	},
	computed: {
		headersWithoutCheckbox() {
			return this.headers.filter(header => header.value !== 'select')
		},
	},
	methods: {
		startEditing(field) {
			this.editingField = field
		},
		saveEdit() {
			this.editingField = null
		},
		isEditing(field) {
			return this.editingField === field
		},
	},
}
</script>

<style></style>

<template>
	<v-data-table
		:items="items"
		:headers="headers"
		:search="search"
		class="custom-table"
		:loading="loading"
		@update:loading="updateLoading"
		:footer-props="footerProps">
		<template slot="item.edit" scope="props">
			<td>
				<v-btn @click.stop="openEditDialog(props.item)" icon>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</td>
		</template>

		<template v-for="header in imageHeaders" :slot="`item.${header.value}`" scope="props">
			<td :key="props.item._id + header.value">
				<v-img v-if="props.item[header.value]" :src="props.item[header.value]" width="50" height="50"></v-img>
				<span v-else>No data</span>
			</td>
		</template>
	</v-data-table>
</template>

<script>
export default {
	props: ['items', 'headers', 'search', 'loading', 'footerProps', 'openEditDialog', 'updateLoading', 'imageHeaders'],
}
</script>

<style></style>

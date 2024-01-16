import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		characters: [],
		loading: false,
		dataFetched: false,
	},
	mutations: {
		setCharacters(state, characters) {
			state.characters = characters
		},
		setLoading(state, loading) {
			state.loading = loading
		},
		setDataFetched(state, value) {
			state.dataFetched = value
		},
		editCharacter(state, editedCharacter) {
			const index = state.characters.findIndex(character => character._id === editedCharacter._id)

			if (index !== -1) {
				Vue.set(state.characters, index, { ...editedCharacter })
			}
		},
		addNewCharacter(state, newCharacter) {
			state.characters = [...state.characters, newCharacter]
		},
	},
	actions: {
		fetchCharacters({ commit, state }, { currentPage, perPage }) {
			if (state.dataFetched) {
				return Promise.resolve()
			}

			commit('setLoading', true)

			const apiUrl = `https://api-blue-archive.vercel.app/api/characters?page=${currentPage}&perPage=${perPage}`

			return fetch(apiUrl)
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`)
					}
					return response.json()
				})
				.then(data => {
					commit('setCharacters', data.data)
					commit('setDataFetched', true)
				})
				.catch(error => {
					console.error('Error fetching characters:', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		editCharacter({ commit }, editedCharacter) {
			commit('editCharacter', editedCharacter)
		},
		addNewCharacter({ commit }, newCharacter) {
			commit('addNewCharacter', newCharacter)
		},
	},
	getters: {
		SetCharacters: state => state.characters,
		isloading: state => state.loading,
		dataFetched: state => state.dataFetched,
	},
})

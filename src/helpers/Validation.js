export const ValidationMixin = {
	data() {
		return {
			nameRules: [v => !!v || 'Name is required'],
			schoolRules: [v => !!v || 'School is required'],
			birthdayRules: [v => !!v || 'Please select a birthday'],
			damageTypeRules: [v => !!v || 'Damage Type is required'],
			photoUrlRules: [
				v => !v || /^(http).+(\.jpg)$/.test(v) || 'Invalid Photo URL (must start with http and end with .jpg)',
			],
			imageSchoolRules: [
				v => !v || /^(http).+(\.jpg)$/.test(v) || 'Invalid School Symbol URL (must start with http and end with .jpg)',
			],
		}
	},
}

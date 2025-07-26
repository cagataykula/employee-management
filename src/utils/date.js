export function formatDate(dateString) {
	if (!dateString) return ''

	try {
		if (dateString.includes('-') && dateString.length === 10) {
			const [year, month, day] = dateString.split('-')
			const yearNum = parseInt(year, 10)
			const monthNum = parseInt(month, 10)
			const dayNum = parseInt(day, 10)

			if (
				isNaN(yearNum) ||
				isNaN(monthNum) ||
				isNaN(dayNum) ||
				monthNum < 1 ||
				monthNum > 12 ||
				dayNum < 1 ||
				dayNum > 31 ||
				year.length !== 4 ||
				month.length !== 2 ||
				day.length !== 2
			) {
				return dateString
			}

			return `${day}/${month}/${year}`
		}

		if (dateString.includes('T')) {
			const date = new Date(dateString)
			if (isNaN(date.getTime())) {
				return dateString
			}

			const day = date.getDate().toString().padStart(2, '0')
			const month = (date.getMonth() + 1).toString().padStart(2, '0')
			const year = date.getFullYear()

			return `${day}/${month}/${year}`
		}

		const date = new Date(dateString)
		if (isNaN(date.getTime())) {
			return dateString
		}

		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()

		return `${day}/${month}/${year}`
	} catch (error) {
		console.error('Error formatting date:', error)
		return dateString
	}
}

export function isValidDate(dateString) {
	if (!dateString) return false

	const date = new Date(dateString)
	return date instanceof Date && !isNaN(date)
}

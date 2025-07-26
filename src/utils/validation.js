export function isValidEmail(email) {
	if (!email) return false

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export function isValidPhone(phone) {
	if (!phone) return false

	const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
	const phoneRegex = /^(\+\d{10,15}|\d{10})$/

	return phoneRegex.test(cleanPhone)
}

export function isRequired(value) {
	if (typeof value === 'string') {
		return value.trim().length > 0
	}
	return value !== null && value !== undefined
}

export function hasMinLength(value, minLength) {
	if (!value) return false
	return value.toString().length >= minLength
}

export function hasMaxLength(value, maxLength) {
	if (!value) return true
	return value.toString().length <= maxLength
}

export function isNotFutureDate(dateString) {
	if (!dateString) return false

	try {
		const date = new Date(dateString)
		const today = new Date()
		today.setHours(23, 59, 59, 999)
		return date <= today
	} catch (error) {
		return false
	}
}

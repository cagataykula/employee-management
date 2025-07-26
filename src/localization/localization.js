import en from '../locales/en.json'
import tr from '../locales/tr.json'

const translations = {
	en,
	tr
}

let currentLang = document.documentElement.lang || 'en'
if (!translations[currentLang]) {
	console.warn(
		`Localization: Language "${currentLang}" not found, falling back to 'en'.`
	)
	currentLang = 'en'
}

let currentTranslations = translations[currentLang]

// Event for notifying components about language changes
const LANGUAGE_CHANGED_EVENT = 'language-changed'

/**
 * Gets the translated string for a given key.
 * Supports simple interpolation with {key}.
 *
 * @param {string} key - The translation key.
 * @param {object} [values] - Optional values for interpolation.
 * @returns {string} The translated string or the key itself if not found.
 */
export function t(key, values) {
	let translation = currentTranslations[key] || key

	if (values && typeof translation === 'string') {
		Object.keys(values).forEach((valueKey) => {
			const regex = new RegExp(`\\\{${valueKey}\\\}`, 'g')
			translation = translation.replace(regex, values[valueKey])
		})
	}

	return translation
}

/**
 * Gets the current language code.
 * @returns {string} The current language code.
 */
export function getCurrentLanguage() {
	return currentLang
}

/**
 * Sets the language and updates all components.
 * @param {string} langCode - The language code to set (e.g., 'en', 'tr').
 */
export function setLanguage(langCode) {
	if (!translations[langCode]) {
		console.warn(
			`Language "${langCode}" not supported. Available: ${Object.keys(
				translations
			).join(', ')}`
		)
		return
	}

	currentLang = langCode
	currentTranslations = translations[langCode]
	document.documentElement.lang = langCode

	// Dispatch custom event to notify all components
	window.dispatchEvent(
		new CustomEvent(LANGUAGE_CHANGED_EVENT, {
			detail: { language: langCode }
		})
	)
}

/**
 * Gets all available languages.
 * @returns {Array} Array of language objects with code and name.
 */
export function getAvailableLanguages() {
	return [
		{ code: 'en', name: 'English', nativeName: 'English' },
		{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe' }
	]
}

import {
	describe,
	it,
	expect,
	beforeAll,
	afterAll,
	beforeEach,
	vi
} from 'vitest' // Import vitest globals
import {
	t,
	getCurrentLanguage,
	setLanguage,
	getAvailableLanguages
} from './localization.js'
// Note: The localization module reads document.documentElement.lang on initialization.
// Tests will likely run with the default 'en' unless the test environment setup changes lang.

describe('Localization Helper', () => {
	// Store original lang and restore after tests
	let originalLang
	let eventListener

	beforeAll(() => {
		originalLang = document.documentElement.lang
	})

	afterAll(() => {
		document.documentElement.lang = originalLang || 'en' // Restore or default to en
	})

	beforeEach(() => {
		// Reset to English before each test
		if (document.documentElement.lang !== 'en') {
			document.documentElement.lang = 'en'
			// Trigger a reload of the module state by setting language
			setLanguage('en')
		}
	})

	describe('t() function', () => {
		it('should retrieve existing keys for the default language (en)', () => {
			expect(t('companyTitle')).toBe('ING')
			expect(t('viewEmployees')).toBe('Employees')
			expect(t('addEmployee')).toBe('Add New')
			expect(t('cancel')).toBe('Cancel')
		})

		it('should return the key itself if the key is missing', () => {
			const missingKey = 'thisKeyDoesNotExist_123'
			expect(t(missingKey)).toBe(missingKey)
		})

		it('should handle placeholder interpolation correctly', () => {
			const name = 'Test User'
			const count = 5
			expect(t('confirmDeleteMessage', { name })).toBe(
				`Selected Employee record of ${name} will be deleted`
			)
			expect(t('confirmBulkDeleteMessage', { count })).toBe(
				`Are you sure you want to delete ${count} selected employee record(s)?`
			)
		})

		it('should return the key if values are provided but the key is missing', () => {
			const missingKey = 'anotherMissingKey_456'
			expect(t(missingKey, { name: 'Ignored' })).toBe(missingKey)
		})

		it('should return the original translation if values are provided but dont match placeholders', () => {
			expect(t('confirmDeleteMessage', { nonMatchingValue: 'ignored' })).toBe(
				'Selected Employee record of {name} will be deleted'
			)
		})

		it('should handle multiple placeholders', () => {
			expect(t('confirmBulkDeleteMessage', { count: 3 })).toBe(
				`Are you sure you want to delete 3 selected employee record(s)?`
			)
		})
	})

	describe('getCurrentLanguage() function', () => {
		it('should return the current language code', () => {
			expect(getCurrentLanguage()).toBe('en')
		})

		it('should return updated language after setLanguage call', () => {
			setLanguage('tr')
			expect(getCurrentLanguage()).toBe('tr')

			// Reset back to English
			setLanguage('en')
		})
	})

	describe('getAvailableLanguages() function', () => {
		it('should return array of available languages', () => {
			const languages = getAvailableLanguages()
			expect(Array.isArray(languages)).toBe(true)
			expect(languages).toHaveLength(2)
		})

		it('should return languages with correct structure', () => {
			const languages = getAvailableLanguages()

			expect(languages[0]).toEqual({
				code: 'en',
				name: 'English',
				nativeName: 'English'
			})

			expect(languages[1]).toEqual({
				code: 'tr',
				name: 'Turkish',
				nativeName: 'Türkçe'
			})
		})
	})

	describe('setLanguage() function', () => {
		it('should change language successfully to Turkish', () => {
			setLanguage('tr')
			expect(getCurrentLanguage()).toBe('tr')
			expect(document.documentElement.lang).toBe('tr')

			// Test that Turkish translations are working
			expect(t('viewEmployees')).toBe('Personelleri Görüntüle')
			expect(t('cancel')).toBe('İptal')

			// Reset back to English
			setLanguage('en')
		})

		it('should handle unsupported language gracefully', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			setLanguage('unsupported')

			// Should stay on current language (English)
			expect(getCurrentLanguage()).toBe('en')
			expect(consoleSpy).toHaveBeenCalledWith(
				'Language "unsupported" not supported. Available: en, tr'
			)

			consoleSpy.mockRestore()
		})

		it('should dispatch language-changed custom event', () => {
			const eventSpy = vi.fn()
			window.addEventListener('language-changed', eventSpy)

			setLanguage('tr')

			expect(eventSpy).toHaveBeenCalledTimes(1)
			expect(eventSpy).toHaveBeenCalledWith(
				expect.objectContaining({
					detail: { language: 'tr' }
				})
			)

			window.removeEventListener('language-changed', eventSpy)

			// Reset back to English
			setLanguage('en')
		})

		it('should update translations after language change', () => {
			// Start with English
			expect(t('companyTitle')).toBe('ING')

			// Switch to Turkish
			setLanguage('tr')
			expect(t('addEmployee')).toBe('Personel Ekle')
			expect(t('firstName')).toBe('Ad')

			// Switch back to English
			setLanguage('en')
			expect(t('addEmployee')).toBe('Add New')
			expect(t('firstName')).toBe('First Name')
		})
	})

	describe('Language fallback behavior', () => {
		it('should handle translation keys that exist in both languages', () => {
			// Company title should be same in both languages
			setLanguage('en')
			const englishTitle = t('companyTitle')

			setLanguage('tr')
			const turkishTitle = t('companyTitle')

			expect(englishTitle).toBe('ING')
			expect(turkishTitle).toBe('ING')

			// Reset
			setLanguage('en')
		})

		it('should return key for missing translation in any language', () => {
			const missingKey = 'nonExistentKey'

			setLanguage('en')
			expect(t(missingKey)).toBe(missingKey)

			setLanguage('tr')
			expect(t(missingKey)).toBe(missingKey)

			// Reset
			setLanguage('en')
		})
	})
})

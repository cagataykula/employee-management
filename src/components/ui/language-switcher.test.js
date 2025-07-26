import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fixture, html, nextFrame, oneEvent } from '@open-wc/testing'

// Mock localization module
vi.mock('../../localization/localization.js', () => {
	let currentLanguage = 'en'
	const availableLanguages = [
		{ code: 'en', name: 'English', nativeName: 'English' },
		{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe' }
	]

	return {
		getCurrentLanguage: vi.fn(() => currentLanguage),
		setLanguage: vi.fn((langCode) => {
			currentLanguage = langCode
			// Simulate language-changed event
			window.dispatchEvent(
				new CustomEvent('language-changed', {
					detail: { language: langCode }
				})
			)
		}),
		getAvailableLanguages: vi.fn(() => availableLanguages),
		_setMockLanguage: (lang) => {
			currentLanguage = lang
		} // Helper for tests
	}
})

// Import the component AFTER mocks are set up
import './language-switcher.js'
import {
	getCurrentLanguage,
	setLanguage,
	getAvailableLanguages,
	_setMockLanguage
} from '../../localization/localization.js'

describe('LanguageSwitcher', () => {
	let element

	beforeEach(() => {
		vi.resetAllMocks()
		_setMockLanguage('en') // Reset to English before each test
	})

	afterEach(() => {
		if (element && element.parentNode) {
			element.parentNode.removeChild(element)
		}
		element = null
	})

	it('should render with current language flag', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')
		const flag = currentLanguage.querySelector('.flag')

		expect(currentLanguage).toBeDefined()
		expect(flag).toBeDefined()
		expect(flag.textContent).toBe('🇬🇧') // English flag
		expect(getCurrentLanguage).toHaveBeenCalled()
	})

	it('should initialize with correct language from localization module', async () => {
		_setMockLanguage('tr')
		getCurrentLanguage.mockReturnValue('tr')

		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const flag = element.shadowRoot.querySelector('.current-language .flag')
		expect(flag.textContent).toBe('🇹🇷') // Turkish flag
	})

	it('should display dropdown when clicked', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')
		const dropdown = element.shadowRoot.querySelector('.dropdown')

		// Initially dropdown should be hidden
		expect(dropdown.classList.contains('hidden')).toBe(true)

		// Click to open dropdown
		currentLanguage.click()
		await element.updateComplete

		expect(dropdown.classList.contains('hidden')).toBe(false)
	})

	it('should close dropdown when same language is selected', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')
		const dropdown = element.shadowRoot.querySelector('.dropdown')

		// Open dropdown
		currentLanguage.click()
		await element.updateComplete
		expect(dropdown.classList.contains('hidden')).toBe(false)

		// Click on current language option
		const englishOption = element.shadowRoot.querySelector('.language-option')
		englishOption.click()
		await element.updateComplete

		expect(dropdown.classList.contains('hidden')).toBe(true)
		expect(setLanguage).not.toHaveBeenCalled() // Same language, shouldn't call setLanguage
	})

	it('should change language when different language is selected', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')

		// Open dropdown
		currentLanguage.click()
		await element.updateComplete

		// Find and click Turkish option
		const options = element.shadowRoot.querySelectorAll('.language-option')
		const turkishOption = Array.from(options).find(
			(option) => option.querySelector('.flag').textContent === '🇹🇷'
		)

		turkishOption.click()
		await element.updateComplete

		expect(setLanguage).toHaveBeenCalledWith('tr')
	})

	it('should update current language when language-changed event is fired', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		// Initially should be English
		let flag = element.shadowRoot.querySelector('.current-language .flag')
		expect(flag.textContent).toBe('🇬🇧')

		// Simulate language change event
		_setMockLanguage('tr')
		getCurrentLanguage.mockReturnValue('tr')
		window.dispatchEvent(
			new CustomEvent('language-changed', {
				detail: { language: 'tr' }
			})
		)

		await element.updateComplete

		flag = element.shadowRoot.querySelector('.current-language .flag')
		expect(flag.textContent).toBe('🇹🇷')
	})

	it('should close dropdown when language-changed event is fired', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')
		const dropdown = element.shadowRoot.querySelector('.dropdown')

		// Open dropdown
		currentLanguage.click()
		await element.updateComplete
		expect(dropdown.classList.contains('hidden')).toBe(false)

		// Fire language-changed event
		window.dispatchEvent(
			new CustomEvent('language-changed', {
				detail: { language: 'tr' }
			})
		)

		await element.updateComplete
		expect(dropdown.classList.contains('hidden')).toBe(true)
	})

	it('should toggle dropdown state when clicked multiple times', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')
		const dropdown = element.shadowRoot.querySelector('.dropdown')

		// Initially closed
		expect(dropdown.classList.contains('hidden')).toBe(true)

		// First click - open
		currentLanguage.click()
		await element.updateComplete
		expect(dropdown.classList.contains('hidden')).toBe(false)

		// Second click - close
		currentLanguage.click()
		await element.updateComplete
		expect(dropdown.classList.contains('hidden')).toBe(true)
	})

	it('should display all available languages in dropdown', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')

		// Open dropdown
		currentLanguage.click()
		await element.updateComplete

		const options = element.shadowRoot.querySelectorAll('.language-option')
		expect(options).toHaveLength(2)

		const flags = Array.from(options).map(
			(option) => option.querySelector('.flag').textContent
		)
		expect(flags).toContain('🇬🇧') // English
		expect(flags).toContain('🇹🇷') // Turkish
		expect(getAvailableLanguages).toHaveBeenCalled()
	})

	it('should mark current language as active in dropdown', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')

		// Open dropdown
		currentLanguage.click()
		await element.updateComplete

		const activeOption = element.shadowRoot.querySelector(
			'.language-option.active'
		)
		expect(activeOption).toBeDefined()
		expect(activeOption.querySelector('.flag').textContent).toBe('🇬🇧') // Current language
	})

	it('should handle click events with stopPropagation', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')

		// Mock event with stopPropagation
		const mockEvent = {
			stopPropagation: vi.fn()
		}

		// Manually trigger click handler
		element._toggleDropdown(mockEvent)
		expect(mockEvent.stopPropagation).toHaveBeenCalled()
	})

	it('should handle outside click to close dropdown', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')
		const dropdown = element.shadowRoot.querySelector('.dropdown')

		// Open dropdown
		currentLanguage.click()
		await element.updateComplete
		expect(dropdown.classList.contains('hidden')).toBe(false)

		// Call the outside click handler directly
		const outsideClickEvent = new Event('click', { bubbles: true })
		Object.defineProperty(outsideClickEvent, 'composedPath', {
			value: () => [document.body] // Path that doesn't include our component
		})

		element._handleOutsideClick(outsideClickEvent)
		await element.updateComplete

		expect(dropdown.classList.contains('hidden')).toBe(true)
	})

	it('should get correct flag emoji for different languages', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		// Test the getFlagEmoji function indirectly through render
		const currentLanguage =
			element.shadowRoot.querySelector('.current-language')

		// Open dropdown to see all flags
		currentLanguage.click()
		await element.updateComplete

		const options = element.shadowRoot.querySelectorAll('.language-option')
		const flags = Array.from(options).map(
			(option) => option.querySelector('.flag').textContent
		)

		expect(flags).toContain('🇬🇧') // English
		expect(flags).toContain('🇹🇷') // Turkish
	})

	it('should properly clean up event listeners on disconnect', async () => {
		element = await fixture(
			html`
				<language-switcher></language-switcher>
			`
		)
		await element.updateComplete

		const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
		const documentRemoveEventListenerSpy = vi.spyOn(
			document,
			'removeEventListener'
		)

		// Remove element from DOM to trigger disconnectedCallback
		element.remove()

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			'language-changed',
			expect.any(Function)
		)
		expect(documentRemoveEventListenerSpy).toHaveBeenCalledWith(
			'click',
			expect.any(Function)
		)

		removeEventListenerSpy.mockRestore()
		documentRemoveEventListenerSpy.mockRestore()
	})
})

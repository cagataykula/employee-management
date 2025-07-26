import { describe, it, expect, afterEach, vi } from 'vitest'
import { fixture, html } from '@open-wc/testing'

// Mock Vaadin Router before importing app
vi.mock('@vaadin/router', () => {
	// Create mock functions for instance methods
	const mockSetRoutes = vi.fn()
	const mockSetOutlet = vi.fn() // Keep static mock if needed, or make instance

	return {
		Router: class {
			// Constructor can be simple or capture outlet if needed
			constructor(outlet) {
				// console.log('Mock Router instantiated with outlet:', outlet);
				this.outlet = outlet // Store outlet if necessary for checks
			}

			// Instance method mock
			setRoutes = mockSetRoutes

			// Static method mock (if needed by other code)
			static setOutlet = mockSetOutlet

			// Add other static/instance methods if MainApp uses them
		},
		// Expose mocks if needed for assertions in tests
		_mockRouterInstanceSetRoutes: mockSetRoutes,
		_mockRouterStaticSetOutlet: mockSetOutlet
	}
})

// Import the component definition AFTER mocks
import './app.js'

describe('MainApp', () => {
	let element

	afterEach(() => {
		// Clean up the fixture
		if (element && element.parentNode) {
			element.parentNode.removeChild(element)
		}
		element = null
		vi.resetAllMocks()
	})

	it('should render the header, main outlet, and footer', async () => {
		element = await fixture(
			html`
				<main-app></main-app>
			`
		)
		await element.updateComplete

		const header = element.shadowRoot.querySelector('header')
		const navMenu = header.querySelector('nav-menu') // Assuming nav is in header
		const main = element.shadowRoot.querySelector('main')
		const footer = element.shadowRoot.querySelector('footer')
		const routerOutlet = main.querySelector('#router-outlet') // Check for the outlet div

		expect(header).toBeDefined()
		expect(navMenu).toBeDefined()
		expect(main).toBeDefined()
		expect(routerOutlet).toBeDefined() // Verify router outlet exists
		expect(footer).toBeDefined()
		// Check footer content for copyright and year
		expect(footer.textContent).toContain('©')
		expect(footer.textContent).toContain(new Date().getFullYear().toString())
	})

	it('should render nav-menu with location property', async () => {
		element = await fixture(
			html`
				<main-app></main-app>
			`
		)
		await element.updateComplete

		const navMenu = element.shadowRoot.querySelector('nav-menu')
		expect(navMenu).toBeDefined()
		// Check if the location object is passed (might be tricky to assert directly)
		// A basic check is that it exists
		expect(navMenu.location).toBeDefined()
		expect(navMenu.location.pathname).toBeDefined() // Check structure
	})

	// Add more tests later for router setup if needed, though mocking makes it hard
})

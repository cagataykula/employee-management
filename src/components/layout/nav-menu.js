import { LitElement, html, css } from 'lit'
import { t } from '../../localization/localization.js' // Import translation function
import { classMap } from 'lit/directives/class-map.js' // Import classMap
import '../ui/language-switcher.js' // Import language switcher

class NavMenu extends LitElement {
	static properties = {
		location: { state: true },
		_currentLanguage: { state: true }
	}

	constructor() {
		super()
		this._handleLanguageChange = this._handleLanguageChange.bind(this)
	}

	connectedCallback() {
		super.connectedCallback()
		window.addEventListener('language-changed', this._handleLanguageChange)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		window.removeEventListener('language-changed', this._handleLanguageChange)
	}

	_handleLanguageChange() {
		// Force re-render when language changes
		this.requestUpdate()
	}

	static styles = css`
		:host {
			display: block;
		}
		nav {
			display: flex;
			align-items: center;
			gap: 1.5rem;
		}
		a {
			text-decoration: none;
			color: var(--secondary-color);
			padding: 0.5rem 0;
			border-radius: 0;
			transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
				border-color 0.2s ease-in-out;
			font-weight: 500;
			border-bottom: 2px solid transparent;
			font-size: 16px;
			display: flex;
			align-items: center;
			gap: 0.4rem;
		}
		img.nav-icon {
			height: 16px;
			width: 16px;
			vertical-align: middle;
		}
		a:hover,
		a:focus {
			background-color: transparent;
			outline: none;
		}
		a.active {
			font-weight: 500;
			border-bottom: 2px solid var(--secondary-color);
		}
		.nav-divider {
			width: 1px;
			height: 24px;
			background-color: var(--border-color, #e9ecef);
			margin: 0 0.5rem;
		}
	`

	render() {
		const currentPath = this.location?.pathname || window.location.pathname // Fallback just in case

		const viewActive =
			currentPath.startsWith('/employees') || currentPath === '/'
		const addActive = currentPath.startsWith('/add-employee')

		const viewClasses = { active: viewActive }
		const addClasses = { active: addActive }

		// Using standard <a> tags for Vaadin Router links
		return html`
			<nav>
				<a href="/employees" class=${classMap(viewClasses)}>
					<img src="/icons/employee-icon.png" alt="" class="nav-icon" />
					${t('viewEmployees')}
				</a>
				<a href="/add-employee" class=${classMap(addClasses)}>
					<img src="/icons/plus-icon.png" alt="" class="nav-icon" />
					${t('addEmployee')}
				</a>
				<div class="nav-divider"></div>
				<language-switcher></language-switcher>
			</nav>
		`
	}
}

customElements.define('nav-menu', NavMenu)

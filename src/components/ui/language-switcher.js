import { LitElement, html, css } from 'lit'
import {
	getCurrentLanguage,
	setLanguage,
	getAvailableLanguages
} from '../../localization/localization.js'

class LanguageSwitcher extends LitElement {
	static properties = {
		_currentLanguage: { state: true },
		_isOpen: { state: true }
	}

	constructor() {
		super()
		this._currentLanguage = getCurrentLanguage()
		this._isOpen = false
		this._handleLanguageChange = this._handleLanguageChange.bind(this)
	}

	connectedCallback() {
		super.connectedCallback()
		window.addEventListener('language-changed', this._handleLanguageChange)
		// Close dropdown when clicking outside - use a slight delay to allow current click to process
		setTimeout(() => {
			document.addEventListener('click', this._handleOutsideClick.bind(this))
		}, 0)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		window.removeEventListener('language-changed', this._handleLanguageChange)
		document.removeEventListener('click', this._handleOutsideClick.bind(this))
	}

	_handleLanguageChange(event) {
		this._currentLanguage = event.detail.language
		this._isOpen = false
	}

	_handleOutsideClick(event) {
		// Check if click is outside the component
		if (!event.composedPath().includes(this)) {
			this._isOpen = false
		}
	}

	_toggleDropdown(event) {
		event.stopPropagation()
		this._isOpen = !this._isOpen
	}

	_selectLanguage(langCode, event) {
		event.stopPropagation()
		if (langCode !== this._currentLanguage) {
			setLanguage(langCode)
		}
		this._isOpen = false
	}

	static styles = css`
		:host {
			position: relative;
			display: inline-block;
		}

		.language-switcher {
			position: relative;
		}

		.current-language {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.2rem 0.5rem;
			background: transparent;
			border: 1px solid var(--secondary-color, #ffb587);
			border-radius: 6px;
			cursor: pointer;
			font-size: 14px;
			color: var(--secondary-color, #ffb587);
			transition: all 0.2s ease;
			user-select: none;
		}

		.current-language:hover {
			background-color: var(--secondary-color-light-hover, #fff0e6);
		}

		.flag {
			font-size: 16px;
			display: inline-block;
		}

		.dropdown {
			position: absolute;
			top: 100%;
			right: 0;
			margin-top: 2px;
			background: #fff;
			border: 1px solid #e9ecef;
			border-radius: 6px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			overflow: hidden;
			z-index: 1000;
			min-width: auto;
			opacity: 1;
			visibility: visible;
			transition: opacity 0.2s ease, visibility 0.2s ease;
		}

		.language-option {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.4rem 0.5rem;
			cursor: pointer;
			transition: background-color 0.2s ease;
			font-size: 14px;
			color: #333;
		}

		.language-option:hover {
			background-color: #f8f9fa;
		}

		.language-option.active {
			background-color: var(--secondary-color-light-hover, #fff0e6);
			color: var(--secondary-color, #ffb587);
			font-weight: 500;
		}

		.dropdown.hidden {
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
		}
	`

	render() {
		const languages = getAvailableLanguages()
		const currentLang = languages.find(
			(lang) => lang.code === this._currentLanguage
		)

		const getFlagEmoji = (langCode) => {
			switch (langCode) {
				case 'en':
					return '🇬🇧'
				case 'tr':
					return '🇹🇷'
				default:
					return '🏳️'
			}
		}

		return html`
			<div class="language-switcher">
				<div
					class="current-language ${this._isOpen ? 'open' : ''}"
					@click=${this._toggleDropdown}
				>
					<span class="flag">${getFlagEmoji(this._currentLanguage)}</span>
				</div>

				<div class="dropdown ${this._isOpen ? '' : 'hidden'}">
					${languages.map(
						(lang) => html`
							<div
								class="language-option ${lang.code === this._currentLanguage
									? 'active'
									: ''}"
								@click=${(e) => this._selectLanguage(lang.code, e)}
							>
								<span class="flag">${getFlagEmoji(lang.code)}</span>
							</div>
						`
					)}
				</div>
			</div>
		`
	}
}

customElements.define('language-switcher', LanguageSwitcher)

import { LitElement, html, css } from 'lit'
import { t } from '../../localization/localization.js' // Import t for labels
import { formatDate } from '../../utils/date.js'

class EmployeeCard extends LitElement {
	static properties = {
		employee: { type: Object }
	}

	constructor() {
		super()
		this.employee = {}
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
		this.requestUpdate()
	}

	_handleEditClick() {
		this.dispatchEvent(
			new CustomEvent('edit-employee', {
				detail: { employeeId: this.employee.id },
				bubbles: true,
				composed: true
			})
		)
	}

	_handleDeleteClick() {
		this.dispatchEvent(
			new CustomEvent('delete-employee', {
				detail: { employeeId: this.employee.id },
				bubbles: true,
				composed: true
			})
		)
	}

	static styles = css`
		:host {
			display: block;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			font-size: 14px;
			color: #333;
			--card-padding: 1.5rem;
			--grey-color: #6c757d;
			--light-grey-color: #adb5bd;
			--avatar-bg: #f8f9fa;
			--card-bg: #ffffff;
			--border-color: #e9ecef;
			--edit-btn-color: #6f42c1;
			--edit-btn-hover: #5a32a3;
			--delete-btn-color: #ff6b35;
			--delete-btn-hover: #e55a2b;
		}

		.employee-card {
			background-color: var(--card-bg);
			border-radius: 16px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			padding: var(--card-padding);
			display: flex;
			flex-direction: column;
			height: 100%;
			box-sizing: border-box;
			transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
			border: 1px solid var(--border-color);
		}
		.employee-card:hover {
			transform: translateY(-2px);
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
		}

		.card-header {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
			margin-bottom: 1.5rem;
		}

		.avatar-placeholder {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background-color: var(--avatar-bg);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			border: 2px solid var(--border-color);
		}
		.avatar-icon {
			width: 32px;
			height: 32px;
			opacity: 0.6;
			filter: grayscale(1);
		}

		.name-position {
			flex-grow: 1;
			min-width: 0;
		}
		.name-position h3 {
			margin: 0 0 0.25rem 0;
			font-size: 1.25rem;
			font-weight: 600;
			color: #212529;
			line-height: 1.2;
		}
		.name-position span {
			font-size: 0.95rem;
			color: var(--grey-color);
			font-weight: 500;
		}

		.card-details {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 0.75rem 1.25rem;
			margin-bottom: 1.5rem;
			flex-grow: 1;
			align-items: start;
		}

		.detail-key {
			color: var(--grey-color);
			font-weight: 500;
			font-size: 0.875rem;
			text-align: left;
			white-space: nowrap;
		}

		.detail-value {
			color: #495057;
			font-weight: 400;
			font-size: 0.875rem;
			word-break: break-word;
			text-align: left;
			line-height: 1.4;
		}
		.detail-value a {
			color: inherit;
			text-decoration: none;
		}
		.detail-value a:hover {
			text-decoration: underline;
			color: var(--edit-btn-color);
		}

		.card-actions {
			display: flex;
			gap: 0.75rem;
			margin-top: auto;
		}
		.card-actions button {
			flex: 1;
			padding: 0.75rem 1rem;
			border-radius: 8px;
			cursor: pointer;
			font-weight: 500;
			font-size: 0.875rem;
			transition: all 0.2s ease;
			line-height: 1;
			border: none;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		.card-actions .btn-edit {
			background-color: var(--edit-btn-color);
		}
		.card-actions .btn-edit:hover {
			background-color: var(--edit-btn-hover);
			transform: translateY(-1px);
		}

		.card-actions .btn-delete {
			background-color: var(--delete-btn-color);
		}
		.card-actions .btn-delete:hover {
			background-color: var(--delete-btn-hover);
			transform: translateY(-1px);
		}

		/* Remove the hr divider as it's not in the design */
		hr.card-divider {
			display: none;
		}
	`

	render() {
		if (!this.employee || !this.employee.id) {
			return html``
		}

		return html`
			<div class="employee-card">
				<div class="card-header">
					<div class="avatar-placeholder">
						<img
							src="/icons/user-icon.png"
							alt="User Icon"
							class="avatar-icon"
						/>
					</div>
					<div class="name-position">
						<h3>${this.employee.firstName} ${this.employee.lastName}</h3>
						<span>${this.employee.position}</span>
					</div>
					<!-- Mockup status -->
				</div>

				<div class="card-details">
					<span class="detail-key">${t('emailLabel')}</span>
					<span class="detail-value">
						<a href="mailto:${this.employee.email}">${this.employee.email}</a>
					</span>

					<span class="detail-key">${t('phoneLabel')}</span>
					<span class="detail-value">${this.employee.phoneNumber}</span>

					<span class="detail-key">${t('departmentLabel')}</span>
					<span class="detail-value">${this.employee.department}</span>

					<span class="detail-key">${t('joinedLabel')}</span>
					<span class="detail-value">
						${formatDate(this.employee.dateOfEmployment)}
					</span>

					<span class="detail-key">${t('dateOfBirthLabel')}</span>
					<span class="detail-value">
						${formatDate(this.employee.dateOfBirth)}
					</span>
				</div>

				<div class="card-actions">
					<button class="btn-edit" @click=${this._handleEditClick}>
						${t('edit')}
					</button>
					<button class="btn-delete" @click=${this._handleDeleteClick}>
						${t('delete')}
					</button>
				</div>
			</div>
		`
	}
}

customElements.define('employee-card', EmployeeCard)

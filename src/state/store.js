// Simple in-memory store for employee data

let state = {
	employees: [
		{
			id: '1',
			firstName: 'Alexander',
			lastName: 'Rodriguez',
			dateOfEmployment: '2023-01-15',
			dateOfBirth: '1987-03-12',
			phoneNumber: '+1-415-234-5678',
			email: 'alexander.rodriguez@example.com',
			department: 'Tech',
			position: 'Senior'
		},
		{
			id: '2',
			firstName: 'Emma',
			lastName: 'Thompson',
			dateOfEmployment: '2022-08-01',
			dateOfBirth: '1994-09-28',
			phoneNumber: '212-567-8901',
			email: 'emma.thompson@example.com',
			department: 'Analytics',
			position: 'Medior'
		},
		{
			id: '3',
			firstName: 'Liam',
			lastName: 'Anderson',
			dateOfEmployment: '2023-03-10',
			dateOfBirth: '1995-12-03',
			phoneNumber: '310-789-1234',
			email: 'liam.anderson@example.com',
			department: 'Tech',
			position: 'Junior'
		},
		{
			id: '4',
			firstName: 'Isabella',
			lastName: 'Martinez',
			dateOfEmployment: '2021-11-20',
			dateOfBirth: '1986-05-18',
			phoneNumber: '+1-303-456-7890',
			email: 'isabella.martinez@example.com',
			department: 'Analytics',
			position: 'Senior'
		},
		{
			id: '5',
			firstName: 'Noah',
			lastName: 'Kim',
			dateOfEmployment: '2023-05-01',
			dateOfBirth: '1992-01-07',
			phoneNumber: '206-345-6789',
			email: 'noah.kim@example.com',
			department: 'Tech',
			position: 'Medior'
		},
		{
			id: '6',
			firstName: 'Amara',
			lastName: 'Patel',
			dateOfEmployment: '2022-02-18',
			dateOfBirth: '1996-08-14',
			phoneNumber: '404-678-9012',
			email: 'amara.patel@example.com',
			department: 'Analytics',
			position: 'Junior'
		},
		{
			id: '7',
			firstName: 'Lucas',
			lastName: 'Johnson',
			dateOfEmployment: '2023-07-01',
			dateOfBirth: '1984-10-22',
			phoneNumber: '+1-512-123-4567',
			email: 'lucas.johnson@example.com',
			department: 'Tech',
			position: 'Senior'
		},
		{
			id: '8',
			firstName: 'Zara',
			lastName: 'Williams',
			dateOfEmployment: '2022-10-05',
			dateOfBirth: '1993-06-09',
			phoneNumber: '305-234-5678',
			email: 'zara.williams@example.com',
			department: 'Analytics',
			position: 'Medior'
		},
		{
			id: '9',
			firstName: 'Ethan',
			lastName: 'Taylor',
			dateOfEmployment: '2023-09-15',
			dateOfBirth: '1997-02-26',
			phoneNumber: '602-890-1234',
			email: 'ethan.taylor@example.com',
			department: 'Tech',
			position: 'Junior'
		},
		{
			id: '10',
			firstName: 'Aria',
			lastName: 'Singh',
			dateOfEmployment: '2021-06-01',
			dateOfBirth: '1985-11-15',
			phoneNumber: '+1-617-345-6789',
			email: 'aria.singh@example.com',
			department: 'Analytics',
			position: 'Senior'
		},
		{
			id: '11',
			firstName: 'Sebastian',
			lastName: 'Mueller',
			dateOfEmployment: '2023-11-12',
			dateOfBirth: '1988-07-31',
			phoneNumber: '720-456-7890',
			email: 'sebastian.mueller@example.com',
			department: 'Tech',
			position: 'Senior'
		},
		{
			id: '12',
			firstName: 'Maya',
			lastName: 'Chen',
			dateOfEmployment: '2022-04-22',
			dateOfBirth: '1991-04-13',
			phoneNumber: '503-567-8901',
			email: 'maya.chen@example.com',
			department: 'Analytics',
			position: 'Medior'
		},
		{
			id: '13',
			firstName: 'Oliver',
			lastName: 'Dubois',
			dateOfEmployment: '2024-01-08',
			dateOfBirth: '1990-12-05',
			phoneNumber: '+1-702-789-0123',
			email: 'oliver.dubois@example.com',
			department: 'Tech',
			position: 'Junior'
		},
		{
			id: '14',
			firstName: 'Luna',
			lastName: 'Rossi',
			dateOfEmployment: '2023-12-05',
			dateOfBirth: '1989-03-20',
			phoneNumber: '407-123-4567',
			email: 'luna.rossi@example.com',
			department: 'Analytics',
			position: 'Senior'
		}
	]
}

let nextId = 15
const listeners = new Set()

// --- Private helper functions ---

function _updateState(newState) {
	state = { ...state, ...newState }
	_notifyListeners()
}

function _notifyListeners() {
	listeners.forEach((listener) => listener(state))
}

// --- Public API ---

export const store = {
	/**
	 * Subscribes a listener function to state changes.
	 * @param {Function} listener - The callback function to execute on state change.
	 * @returns {Function} - An unsubscribe function.
	 */
	subscribe(listener) {
		listeners.add(listener)
		listener(state) // Immediately notify with current state
		return () => {
			listeners.delete(listener)
		}
	},

	/**
	 * Gets the current state.
	 * @returns {object} The current state.
	 */
	getState() {
		return state
	},

	/**
	 * Gets the current list of employees.
	 * @returns {Array} The list of employees.
	 */
	getEmployees() {
		return state.employees
	},

	/**
	 * Adds a new employee.
	 * @param {object} employeeData - Data for the new employee (excluding id).
	 */
	addEmployee(employeeData) {
		if (!employeeData || !employeeData.email) {
			console.error('Store: Cannot add employee without data or email.')
			return // Basic validation
		}
		if (state.employees.some((emp) => emp.email === employeeData.email)) {
			console.warn(
				`Store: Employee with email ${employeeData.email} already exists.`
			)
			alert(`Error: Employee with email ${employeeData.email} already exists.`) // Simple feedback
			return
		}

		const newEmployee = {
			...employeeData,
			id: String(nextId++)
		}
		_updateState({ employees: [...state.employees, newEmployee] })
	},

	/**
	 * Updates an existing employee.
	 * @param {string} id - The ID of the employee to update.
	 * @param {object} updatedData - The data to update.
	 */
	updateEmployee(id, updatedData) {
		if (
			updatedData.email &&
			state.employees.some(
				(emp) => emp.id !== id && emp.email === updatedData.email
			)
		) {
			console.warn(
				`Store: Another employee with email ${updatedData.email} already exists.`
			)
			alert(
				`Error: Another employee with email ${updatedData.email} already exists.`
			) // Simple feedback
			return
		}

		const updatedEmployees = state.employees.map((emp) =>
			emp.id === id ? { ...emp, ...updatedData, id } : emp
		)
		_updateState({ employees: updatedEmployees })
	},

	/**
	 * Deletes an employee by ID.
	 * @param {string} id - The ID of the employee to delete.
	 */
	deleteEmployee(id) {
		const updatedEmployees = state.employees.filter((emp) => emp.id !== id)
		_updateState({ employees: updatedEmployees })
	}
}

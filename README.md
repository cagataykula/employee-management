# Employee Management App

### 📋 About the Project

ING Employee Management Application is an employee management system developed using modern web technologies. The application is designed to facilitate adding, editing, deleting, and viewing employee information.

### ✨ Features

- **👥 Employee Management**: Add, edit, delete, and view employees
- **🔍 Search Function**: Quick search in employee list
- **📊 Multiple Views**: Table and list view options
- **🗑️ Bulk Operations**: Select and delete multiple employees
- **📱 Responsive Design**: Compatible with mobile and desktop devices
- **🌐 Multi-language Support**: Turkish and English language options
- **✅ Form Validation**: Comprehensive data validation system
- **📄 Pagination**: Page navigation for large datasets
- **🧪 Test Coverage**: Comprehensive unit tests

### 🛠️ Tech Stack

- **Frontend**: [Lit](https://lit.dev/) (Web Components)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Router**: [Vaadin Router](https://github.com/vaadin/router)
- **Testing**: [Vitest](https://vitest.dev/) + jsdom
- **Styling**: CSS3 with CSS Custom Properties

### 📦 Installation

1. **Clone the project:**

   ```bash
   git clone <repository-url>
   cd employee-management-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

### 🚀 Usage

#### Available NPM Commands

- `npm run dev` - Starts development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the built app
- `npm test` - Runs tests
- `npm run test:watch` - Runs tests in watch mode
- `npm run test:coverage` - Generates test coverage report

#### Employee Operations

1. **Add Employee**: Click "Add New" button from main page
2. **Edit Employee**: Click "Edit" button for relevant employee in the list
3. **Delete Employee**: "Delete" button for single employee, bulk delete for multiple selection
4. **Search**: Use the search box at the top

### 🗂️ Project Structure

```
src/
├── components/           # UI Components
│   ├── employees/       # Employee-related components
│   ├── layout/          # Layout components
│   ├── ui/              # General UI components
│   └── views/           # Page views
├── locales/             # Language files
├── localization/        # Multi-language management
├── state/               # State management
├── styles/              # Global styles
└── utils/               # Utility functions
```

### 🧪 Testing Structure

The project has comprehensive test coverage:

- Unit tests (`*.test.js`)
- Component tests
- Validation tests
- State management tests

### 🔧 Development

#### Adding New Components

1. Add your component to appropriate folder in `src/components/`
2. Create test file (`*.test.js`)
3. Export in `index.js` file

#### Adding New Language

1. Add new language file to `src/locales/` (e.g., `fr.json`)
2. Update `src/localization/localization.js` file

### 📄 License

This project is developed for ING and contains proprietary code.

### 🤝 Contributing

Please follow the established code standards and ensure all tests pass before submitting pull requests.

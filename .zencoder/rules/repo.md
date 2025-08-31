---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary
This is an Ayurvedic e-commerce application with a React frontend and Express.js backend. The project focuses on selling Ayurvedic products with features like product browsing, cart management, and an admin dashboard.

## Repository Structure
- **frontend**: React application built with TypeScript, Vite, and TailwindCSS
- **backend**: Express.js server application
- **.vscode**: VS Code editor configuration
- **.zencoder**: Project documentation and rules

## Projects

### Frontend
**Configuration File**: frontend/package.json

#### Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.5.3
**Build System**: Vite 6.3.5
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- React 18.3.1
- React Router DOM 7.6.3
- Framer Motion 12.23.0
- Lucide React 0.344.0

**Development Dependencies**:
- TypeScript 5.5.3
- Vite 6.3.5
- TailwindCSS 3.4.1
- ESLint 9.9.1

#### Build & Installation
```bash
cd frontend
npm install
npm run dev    # Development server
npm run build  # Production build
```

#### Main Files & Resources
- **Entry Point**: src/main.tsx
- **Main Component**: src/App.tsx
- **Pages**: src/pages/ (Shop, Cart, ProductDetail, Admin)
- **Components**: src/components/ (Common components like Button, ProductCard)
- **Contexts**: src/contexts/ (CartContext for state management)

### Backend
**Configuration File**: backend/package.json

#### Language & Runtime
**Language**: JavaScript (Node.js)
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- Express 5.1.0
- CORS 2.8.5
- dotenv 17.2.1

**Development Dependencies**:
- Nodemon 3.1.10

#### Build & Installation
```bash
cd backend
npm install
```
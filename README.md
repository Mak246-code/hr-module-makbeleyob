# ERP Frontend — Human Resource (HR) Module

This repository contains the completed **HR module** submission for the ERP Frontend Intern Challenge, built on `feature/makbeleyob/human_resource`.

It follows a feature-based architecture — pages stay thin, business logic lives in `services/`, API access is isolated in `api/`, server state is managed with TanStack Query, and global client state uses Zustand only where genuinely needed.

---

## Installation

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. The HR module lives at `/hr`, with a dashboard at `/dashboard`.

---

## Project Structure

```
src/
├── app/
│   ├── hr/
│   │   ├── page.tsx          → Employee Directory (/hr)
│   │   ├── add/page.tsx      → Add Employee (/hr/add)
│   │   └── [id]/page.tsx     → Edit Employee (/hr/:id)
│   ├── dashboard/page.tsx    → Dashboard, reflects selected department
│   └── layout.tsx            → Root layout, renders <Navbar/>
│
├── modules/
│   └── hr/
│       ├── api/hrApi.ts                  → localStorage-backed mock REST API
│       ├── components/                   → EmployeeTable, EmployeeRow, EmployeeForm, etc.
│       ├── hooks/useEmployees.ts         → search + filter + React Query + stats side-effect
│       ├── services/hrService.ts         → validateEmployee, countOnLeave
│       ├── store/                        → departmentFilterStore, employeeSelectionStore
│       └── types/index.ts                → Employee, EmployeeFormValues
│
├── shared/
│   ├── components/layout/Navbar.tsx      → reads hrStatsStore, shows "On Leave" badge
│   └── store/hrStatsStore.ts             → written by useEmployees, read by Navbar
│
└── providers/QueryProvider.tsx           → wraps the app in a TanStack Query client
```

---

## Functional Requirements Implemented

| ID | Requirement | Status |
|----|-------------|--------|
| FR-1 | View all employees | ✅ |
| FR-2 | Search employees by name | ✅ |
| FR-3 | Filter employees by department | ✅ |
| FR-4 | Add a new employee | ✅ |
| FR-5 | Edit an existing employee | ✅ |
| FR-6 | Delete an employee | ✅ |
| FR-7 | Select multiple employees for bulk actions | ✅ |
| FR-8 | Display employees currently on leave in the Navbar | ✅ |
| FR-9 | Dashboard reflects the selected department | ✅ |

## Quality Checklist

- [x] Pages contain minimal logic — all logic lives in `modules/hr/`
- [x] Components are reusable (`EmployeeForm` powers both create and edit)
- [x] API communication isolated from UI components (`api/hrApi.ts`)
- [x] Shared state managed with Zustand only where necessary (3 stores total)
- [x] Local component state uses `useState`
- [x] CRUD operations work correctly, with query invalidation on every mutation
- [x] Search and filtering work correctly
- [x] Navbar updates automatically when employee status changes
- [x] Builds successfully with no TypeScript or ESLint errors

// Shared shape used by every file in this module — the single source of truth.
export interface Employee {
  id: string
  fullName: string
  email: string
  phone?: string
  department: 'Engineering' | 'Sales' | 'HR' | 'Finance' | 'Operations' | 'Marketing' | 'IT'
  position: string
  status: 'active' | 'on_leave' | 'terminated'
  hiredAt: string
  updatedAt: string
}

// Used by the form — id/status/updatedAt are set by the "backend", not the user.
export type EmployeeFormValues = Omit<Employee, 'id' | 'status' | 'updatedAt'>

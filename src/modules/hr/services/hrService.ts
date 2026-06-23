// ── BUSINESS LOGIC ───────────────────────────────────────────────
// Sits between components and api/. Validation and calculations live
// here so they're reusable and testable without React.

import { Employee, EmployeeFormValues } from '../types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmployee(values: EmployeeFormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required'
  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!values.position.trim()) errors.position = 'Position is required'
  if (!values.hiredAt) errors.hiredAt = 'Hire date is required'
  return errors
}

// Used by the navbar badge — counts employees currently on leave
export function countOnLeave(employees: Employee[]): number {
  return employees.filter((employee) => employee.status === 'on_leave').length
}

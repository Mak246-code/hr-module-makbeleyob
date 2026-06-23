'use client'

// ── GLOBAL STATE ─────────────────────────────────────────────────
// Reads and writes the Zustand store DIRECTLY. No props needed —
// any component anywhere (including the Dashboard) can use this
// store the same way.

import { useDepartmentFilterStore } from '../store/departmentFilterStore'

const DEPARTMENTS = ['Engineering', 'Sales', 'HR', 'Finance', 'Operations', 'Marketing', 'IT']

export function DepartmentFilter() {
  const selectedDepartment = useDepartmentFilterStore((s) => s.selectedDepartment)
  const setDepartment = useDepartmentFilterStore((s) => s.setDepartment)

  return (
    <select
      value={selectedDepartment ?? ''}
      onChange={(e) => setDepartment(e.target.value || null)}
      className="border rounded px-3 py-2"
    >
      <option value="">All departments</option>
      {DEPARTMENTS.map((department) => (
        <option key={department} value={department}>{department}</option>
      ))}
    </select>
  )
}

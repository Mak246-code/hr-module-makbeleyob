// ── GLOBAL STATE (Zustand) ───────────────────────────────────────
// Shared between the HR page (DepartmentFilter) and the
// Dashboard page (HR summary card) — two components with NO
// parent/child relationship. Props can't connect them; a store can.

import { create } from 'zustand'

interface DepartmentFilterState {
  selectedDepartment: string | null
  setDepartment: (department: string | null) => void
}

export const useDepartmentFilterStore = create<DepartmentFilterState>((set) => ({
  selectedDepartment: null,
  setDepartment: (department) => set({ selectedDepartment: department }),
}))

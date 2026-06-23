'use client'

// ── ROUTING + GLOBAL STATE ────────────────────────────────────────
// Reads the SAME Zustand store the HR page's DepartmentFilter writes
// to — no props passed between the two pages. This is what makes
// FR-9 ("Dashboard reflects the selected department") possible.

import { useQuery } from '@tanstack/react-query'
import { fetchEmployees } from '@/modules/hr/api/hrApi'
import { useDepartmentFilterStore } from '@/modules/hr/store/departmentFilterStore'

export default function DashboardPage() {
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees })
  const selectedDepartment = useDepartmentFilterStore((s) => s.selectedDepartment)

  const employeeCount = selectedDepartment
    ? employees.filter((employee) => employee.department === selectedDepartment).length
    : employees.length

  const onLeaveInView = selectedDepartment
    ? employees.filter((e) => e.department === selectedDepartment && e.status === 'on_leave').length
    : employees.filter((e) => e.status === 'on_leave').length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-wrap gap-6">
        <div className="border rounded p-4 max-w-sm flex-1 min-w-[220px]">
          <p className="text-sm text-gray-500">
            HR — showing counts for: {selectedDepartment ?? 'All departments'}
          </p>
          <p className="text-3xl font-bold">{employeeCount}</p>
          <p className="text-sm text-gray-500">employees</p>
        </div>

        <div className="border rounded p-4 max-w-sm flex-1 min-w-[220px]">
          <p className="text-sm text-gray-500">
            On Leave — {selectedDepartment ?? 'All departments'}
          </p>
          <p className="text-3xl font-bold text-orange-600">{onLeaveInView}</p>
          <p className="text-sm text-gray-500">employees on leave</p>
        </div>
      </div>
    </div>
  )
}

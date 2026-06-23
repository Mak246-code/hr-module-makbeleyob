// ── PROPS ────────────────────────────────────────────────────────
// Pure presentational component. Gets `isDark` from its parent row
// so the detail panel always contrasts with that row's background,
// making the expanded block visually distinct without a harsh border.

import { Employee } from '../types'

interface EmployeeDetailPanelProps {
  employee: Employee
  isDark: boolean
}

export function EmployeeDetailPanel({ employee, isDark }: EmployeeDetailPanelProps) {
  // Panel is the inverse of its parent row: dark row → light panel, light row → dark panel
  const panelBg   = isDark ? 'bg-gray-700'  : 'bg-gray-200'
  const panelText = isDark ? 'text-gray-200' : 'text-gray-800'

  return (
    <div className={`${panelBg} ${panelText} px-6 py-3 text-sm`}>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone || '—'}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p>
        <strong>Status:</strong>{' '}
        {employee.status === 'on_leave'
          ? 'On Leave'
          : employee.status === 'terminated'
          ? 'Terminated'
          : 'Active'}
      </p>
      <p><strong>Hired:</strong> {new Date(employee.hiredAt).toLocaleDateString()}</p>
      <p><strong>Last updated:</strong> {new Date(employee.updatedAt).toLocaleString()}</p>
    </div>
  )
}

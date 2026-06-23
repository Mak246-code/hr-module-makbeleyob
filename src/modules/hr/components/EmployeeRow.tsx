'use client'

// ── LOCAL STATE + PROPS + GLOBAL STATE, all in one component ──────
// - `employee`, `index`, and `onDelete` come in as PROPS.
// - `isExpanded` and `confirmOpen` are LOCAL state (only this row cares).
// - `selectedIds` / `toggleId` come from GLOBAL Zustand state.
//
// ── ALTERNATING ROW PATTERN ──────────────────────────────────────
// Driven by `index` — the row's position in the FILTERED DATA ARRAY,
// not CSS nth-child. nth-child counts DOM <tr> elements, and when a
// row is expanded, its detail panel inserts an extra <tr> which shifts
// parity for every row below it. Array-index never drifts, even after
// adding, deleting, filtering, or expanding any row.
//
// Two explicit stripe tiers with matching text colors:
//   Dark  rows (even index): bg-gray-800  + text-gray-100  (white-ish text on dark)
//   Light rows (odd  index): bg-gray-50   + text-gray-900  (dark  text on light)
//
// Status labels and action buttons use lighter/darker variants per tier
// so they're always legible — e.g. green-400 pops on dark, green-700
// is bold enough on light.

import { useState } from 'react'
import Link from 'next/link'
import { Employee } from '../types'
import { useEmployeeSelectionStore } from '../store/employeeSelectionStore'
import { EmployeeDetailPanel } from './EmployeeDetailPanel'

interface EmployeeRowProps {
  employee: Employee
  index: number
  onDelete: (id: string) => void
}

export function EmployeeRow({ employee, index, onDelete }: EmployeeRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const selectedIds = useEmployeeSelectionStore((s) => s.selectedIds)
  const toggleId = useEmployeeSelectionStore((s) => s.toggleId)
  const isSelected = selectedIds.includes(employee.id)
  const isOnLeave = employee.status === 'on_leave'

  // ── Per-tier color tokens ─────────────────────────────────────
  const isDark = index % 2 === 0
  const rowBg   = isDark ? 'bg-gray-800'  : 'bg-gray-50'
  const rowText = isDark ? 'text-gray-100' : 'text-gray-900'

  const activeColor     = isDark ? 'text-green-400'  : 'text-green-700'
  const leaveColor      = isDark ? 'text-orange-400' : 'text-orange-600'
  const terminatedColor = isDark ? 'text-gray-400'   : 'text-gray-500'
  const editColor       = isDark ? 'text-blue-400'   : 'text-blue-600'
  const deleteColor     = isDark ? 'text-red-400'    : 'text-red-600'
  const cancelColor     = isDark ? 'text-gray-300'   : 'text-gray-600'

  const statusColor =
    employee.status === 'on_leave'   ? leaveColor :
    employee.status === 'terminated' ? terminatedColor :
    activeColor

  // On-leave uses a left accent border so it stands out on BOTH stripe tiers
  // without fighting their background colors.
  const onLeaveBorder = isOnLeave ? 'border-l-4 border-l-orange-500' : ''

  return (
    <>
      <tr
        className={`border-b border-gray-700 cursor-pointer ${rowBg} ${rowText} ${onLeaveBorder}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="p-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleId(employee.id)}
          />
        </td>
        <td className="p-2">{employee.fullName}</td>
        <td className="p-2">{employee.department}</td>
        <td className="p-2">{employee.position}</td>
        <td className={`p-2 font-medium ${statusColor}`}>
          {employee.status === 'on_leave'
            ? 'On Leave'
            : employee.status === 'terminated'
            ? 'Terminated'
            : 'Active'}
        </td>
        <td className="p-2" onClick={(e) => e.stopPropagation()}>
          {confirmOpen ? (
            <span className="space-x-2">
              <button
                onClick={() => onDelete(employee.id)}
                className={deleteColor}
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className={cancelColor}
              >
                Cancel
              </button>
            </span>
          ) : (
            <span className="space-x-3">
              <Link
                href={`/hr/${employee.id}`}
                className={editColor}
                onClick={(e) => e.stopPropagation()}
              >
                Edit
              </Link>
              <button
                onClick={() => setConfirmOpen(true)}
                className={deleteColor}
              >
                Delete
              </button>
            </span>
          )}
        </td>
      </tr>

      {/* Detail panel inherits the same stripe tier as its parent row,
          so expanding never disrupts the visual rhythm of rows below it. */}
      {isExpanded && (
        <tr className={rowBg}>
          <td colSpan={6} className="p-0">
            <EmployeeDetailPanel employee={employee} isDark={isDark} />
          </td>
        </tr>
      )}
    </>
  )
}

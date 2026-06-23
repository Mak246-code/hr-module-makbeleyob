'use client'

// This is the "wiring" component — calls the hook, composes children.
// LOCAL state (search) is passed as props. GLOBAL state (department
// filter, bulk selection) is consumed directly by child components.

import { useEmployees } from '../hooks/useEmployees'
import { SearchBar } from './SearchBar'
import { DepartmentFilter } from './DepartmentFilter'
import { EmployeeRow } from './EmployeeRow'
import { BulkActionBar } from './BulkActionBar'

export function EmployeeTable() {
  const { employees, isLoading, isError, search, setSearch, removeEmployee } = useEmployees()

  if (isLoading) return <p>Loading employees...</p>
  if (isError) return (
    <p>
      Something went wrong.{' '}
      <button onClick={() => location.reload()}>Retry</button>
    </p>
  )

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SearchBar value={search} onChange={setSearch} />
        <DepartmentFilter />
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-900 text-gray-100 border-b border-gray-600 font-semibold">
            <th className="p-2 w-8"></th>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
            <th className="p-2">Position</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* index is the row's position in the FILTERED data array —
              not the DOM position — so striping never drifts when rows
              are added, deleted, filtered, or expanded. */}
          {employees.map((employee, index) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              index={index}
              onDelete={removeEmployee}
            />
          ))}
        </tbody>
      </table>

      {employees.length === 0 && (
        <p className="mt-4 text-gray-400 text-center">No employees found.</p>
      )}

      <BulkActionBar />
    </div>
  )
}

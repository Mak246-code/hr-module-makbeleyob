'use client'

// ── PROPS DRIVE BEHAVIOR ─────────────────────────────────────────
// ONE component, used for both /hr/add and /hr/[id].
// `mode` and `initialData` (both props) decide what it does on submit.
// All form field values are LOCAL state — they belong only to this form.

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { EmployeeFormValues, Employee } from '../types'
import { createEmployee, updateEmployee } from '../api/hrApi'
import { validateEmployee } from '../services/hrService'

interface EmployeeFormProps {
  mode: 'create' | 'edit'
  initialData?: Employee
}

const DEPARTMENTS: EmployeeFormValues['department'][] = [
  'Engineering', 'Sales', 'HR', 'Finance', 'Operations', 'Marketing', 'IT',
]

const EMPTY_VALUES: EmployeeFormValues = {
  fullName: '', email: '', phone: '', department: 'Engineering', position: '', hiredAt: '',
}

export function EmployeeForm({ mode, initialData }: EmployeeFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // LOCAL STATE — form fields belong only to this component
  const [values, setValues] = useState<EmployeeFormValues>(initialData ?? EMPTY_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  function handleChange(field: keyof EmployeeFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const validationErrors = validateEmployee(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    setServerError('')

    try {
      if (mode === 'create') {
        await createEmployee(values)
      } else if (initialData) {
        await updateEmployee(initialData.id, values)
      }
      // API INTEGRATION: tell React Query the list is stale so it refetches
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      router.push('/hr')
    } catch {
      setServerError('Failed to save employee. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          value={values.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone (optional)</label>
        <input
          value={values.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Department</label>
        <select
          value={values.department}
          onChange={(e) => handleChange('department', e.target.value as EmployeeFormValues['department'])}
          className="border rounded px-3 py-2 w-full"
        >
          {DEPARTMENTS.map((department) => (
            <option key={department}>{department}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Position</label>
        <input
          value={values.position}
          onChange={(e) => handleChange('position', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.position && <p className="text-red-600 text-sm">{errors.position}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Hire Date</label>
        <input
          type="date"
          value={values.hiredAt}
          onChange={(e) => handleChange('hiredAt', e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.hiredAt && <p className="text-red-600 text-sm">{errors.hiredAt}</p>}
      </div>

      {serverError && <p className="text-red-600">{serverError}</p>}

      <button type="submit" disabled={submitting} className="bg-blue-600 text-white rounded px-4 py-2">
        {submitting ? 'Saving...' : mode === 'create' ? 'Add Employee' : 'Save Changes'}
      </button>
    </form>
  )
}

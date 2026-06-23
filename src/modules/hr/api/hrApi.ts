// ── API INTEGRATION ──────────────────────────────────────────────
// This file pretends to be a backend. Every function returns a Promise
// and has an artificial delay, so the rest of the app behaves EXACTLY
// like it would with a real server (loading states, async/await, etc).
// Swap localStorage for axios.get/post later and nothing else changes.

import { Employee, EmployeeFormValues } from '../types'

const STORAGE_KEY = 'hr_employees'

// Fake network latency so loading spinners are actually visible
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Data used to "seed the database" the first time the app runs
const SEED_DATA: Employee[] = [
  { id: '1', fullName: 'Selamawit Tesfaye', email: 'selamawit.tesfaye@digitalmerkato.com', phone: '0911000001', department: 'Engineering', position: 'Frontend Developer', status: 'active', hiredAt: '2022-03-14', updatedAt: new Date().toISOString() },
  { id: '2', fullName: 'Abel Girma', email: 'abel.girma@digitalmerkato.com', phone: '0911000002', department: 'Sales', position: 'Sales Executive', status: 'on_leave', hiredAt: '2021-07-01', updatedAt: new Date().toISOString() },
  { id: '3', fullName: 'Mekdes Alemu', email: 'mekdes.alemu@digitalmerkato.com', department: 'HR', position: 'HR Officer', status: 'active', hiredAt: '2023-01-20', updatedAt: new Date().toISOString() },
  { id: '4', fullName: 'Yonas Bekele', email: 'yonas.bekele@digitalmerkato.com', phone: '0911000004', department: 'Finance', position: 'Accountant', status: 'on_leave', hiredAt: '2020-11-05', updatedAt: new Date().toISOString() },
  { id: '5', fullName: 'Hana Mulugeta', email: 'hana.mulugeta@digitalmerkato.com', department: 'IT', position: 'Systems Administrator', status: 'active', hiredAt: '2022-09-18', updatedAt: new Date().toISOString() },
]

// "Read from the database"
function readDb(): Employee[] {
  if (typeof window === 'undefined') return [] // guard for server-side rendering
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA))
    return SEED_DATA
  }
  return JSON.parse(raw)
}

// "Write to the database"
function writeDb(employees: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
}

// ── Public "API" — same names/shapes you'd use with a real REST API ──

export async function fetchEmployees(): Promise<Employee[]> {
  await delay(400)              // GET /employees
  return readDb()
}

export async function fetchEmployeeById(id: string): Promise<Employee | undefined> {
  await delay(300)              // GET /employees/:id
  return readDb().find((employee) => employee.id === id)
}

export async function createEmployee(payload: EmployeeFormValues): Promise<Employee> {
  await delay(400)              // POST /employees
  const employees = readDb()
  const newEmployee: Employee = {
    ...payload,
    id: crypto.randomUUID(),
    status: 'active',
    updatedAt: new Date().toISOString(),
  }
  writeDb([...employees, newEmployee])
  return newEmployee
}

export async function updateEmployee(id: string, payload: Partial<EmployeeFormValues>): Promise<Employee> {
  await delay(400)              // PATCH /employees/:id
  const employees = readDb()
  const index = employees.findIndex((employee) => employee.id === id)
  if (index === -1) throw new Error('Employee not found')
  const updated = { ...employees[index], ...payload, updatedAt: new Date().toISOString() }
  employees[index] = updated
  writeDb(employees)
  return updated
}

export async function deleteEmployee(id: string): Promise<void> {
  await delay(300)              // DELETE /employees/:id
  writeDb(readDb().filter((employee) => employee.id !== id))
}

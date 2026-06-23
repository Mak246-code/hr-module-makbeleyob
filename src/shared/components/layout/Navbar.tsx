'use client'

// ── GLOBAL STATE ─────────────────────────────────────────────────
// Reads a value WRITTEN by the hr module's hook (useEmployees).
// The Navbar has no idea HOW onLeaveCount was calculated — it just
// displays whatever is currently in the store.

import Link from 'next/link'
import { useHrStatsStore } from '@/shared/store/hrStatsStore'

export function Navbar() {
    const onLeaveCount = useHrStatsStore((s) => s.onLeaveCount)

    return (
        <nav className="flex gap-6 p-4 border-b">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/hr" className="relative">
                HR
                {onLeaveCount > 0 && (
                    <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                        {onLeaveCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}

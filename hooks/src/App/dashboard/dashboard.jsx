"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SalesOverview } from "@/components/sales-overview"
import { SalesChart } from "@/components/sales-chart"
import { TopProducts } from "@/components/top-products"
import { RecentSales } from "@/components/recent-sales"

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("March 2025")
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would handle logout here
    router.push("/login")
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SalesOverview selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <SalesChart className="lg:col-span-4" selectedMonth={selectedMonth} />
          <TopProducts className="lg:col-span-3" selectedMonth={selectedMonth} />
        </div>
        <div className="grid gap-4">
          <RecentSales selectedMonth={selectedMonth} />
        </div>
      </div>
    </DashboardLayout>
  )
}


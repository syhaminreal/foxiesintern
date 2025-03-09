"use client"

import { ChevronDown, DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SalesOverview({ selectedMonth, onMonthChange }) {
  const months = ["January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025"]

  // Mock data for different months
  const data = {
    "January 2025": { revenue: "$12,234", orders: "356", customers: "120", growth: "12.5%" },
    "February 2025": { revenue: "$15,672", orders: "412", customers: "156", growth: "18.2%" },
    "March 2025": { revenue: "$24,567", orders: "523", customers: "215", growth: "24.3%" },
    "April 2025": { revenue: "$18,345", orders: "478", customers: "198", growth: "15.7%" },
    "May 2025": { revenue: "$21,456", orders: "502", customers: "210", growth: "20.1%" },
    "June 2025": { revenue: "$19,876", orders: "489", customers: "205", growth: "17.8%" },
  }

  const currentData = data[selectedMonth]

  return (
    <>
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Month</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto flex gap-1">
                {selectedMonth}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {months.map((month) => (
                <DropdownMenuItem key={month} onClick={() => onMonthChange(month)}>
                  {month}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.revenue}</div>
          <p className="text-xs text-muted-foreground">+{currentData.growth} from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{currentData.orders}</div>
          <p className="text-xs text-muted-foreground">+{currentData.growth} from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{currentData.customers}</div>
          <p className="text-xs text-muted-foreground">+{currentData.growth} from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Growth</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.growth}</div>
          <p className="text-xs text-muted-foreground">Compared to last month</p>
        </CardContent>
      </Card>
    </>
  )
}


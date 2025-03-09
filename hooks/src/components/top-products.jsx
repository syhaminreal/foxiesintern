"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TopProducts({ className, selectedMonth }) {
  // Mock data for different months
  const productsData = {
    "January 2025": [
      { name: "Laptop Pro", sales: 145, percentage: 28 },
      { name: "Wireless Earbuds", sales: 120, percentage: 23 },
      { name: "Smart Watch", sales: 98, percentage: 19 },
      { name: "Bluetooth Speaker", sales: 87, percentage: 17 },
      { name: "Phone Case", sales: 65, percentage: 13 },
    ],
    "February 2025": [
      { name: "Laptop Pro", sales: 156, percentage: 26 },
      { name: "Wireless Earbuds", sales: 142, percentage: 24 },
      { name: "Smart Watch", sales: 112, percentage: 19 },
      { name: "Bluetooth Speaker", sales: 95, percentage: 16 },
      { name: "Phone Case", sales: 89, percentage: 15 },
    ],
    "March 2025": [
      { name: "Laptop Pro", sales: 187, percentage: 30 },
      { name: "Wireless Earbuds", sales: 156, percentage: 25 },
      { name: "Smart Watch", sales: 124, percentage: 20 },
      { name: "Bluetooth Speaker", sales: 98, percentage: 16 },
      { name: "Phone Case", sales: 58, percentage: 9 },
    ],
    "April 2025": [
      { name: "Laptop Pro", sales: 165, percentage: 28 },
      { name: "Wireless Earbuds", sales: 138, percentage: 24 },
      { name: "Smart Watch", sales: 115, percentage: 20 },
      { name: "Bluetooth Speaker", sales: 92, percentage: 16 },
      { name: "Phone Case", sales: 68, percentage: 12 },
    ],
    "May 2025": [
      { name: "Laptop Pro", sales: 178, percentage: 29 },
      { name: "Wireless Earbuds", sales: 149, percentage: 24 },
      { name: "Smart Watch", sales: 121, percentage: 20 },
      { name: "Bluetooth Speaker", sales: 96, percentage: 16 },
      { name: "Phone Case", sales: 72, percentage: 11 },
    ],
    "June 2025": [
      { name: "Laptop Pro", sales: 172, percentage: 28 },
      { name: "Wireless Earbuds", sales: 145, percentage: 24 },
      { name: "Smart Watch", sales: 118, percentage: 19 },
      { name: "Bluetooth Speaker", sales: 94, percentage: 15 },
      { name: "Phone Case", sales: 85, percentage: 14 },
    ],
  }

  const products = productsData[selectedMonth] || []

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best selling products for {selectedMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-muted-foreground">{product.sales} sales</div>
              </div>
              <Progress value={product.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">{product.percentage}% of total sales</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


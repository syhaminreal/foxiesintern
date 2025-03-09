"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesChart({ className, selectedMonth }) {
  const canvasRef = useRef(null)

  // Mock data for different months
  const chartData = {
    "January 2025": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [2400, 3200, 2900, 3700],
    },
    "February 2025": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [3100, 3800, 3500, 4200],
    },
    "March 2025": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [4500, 5200, 6100, 8700],
    },
    "April 2025": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [3800, 4500, 5200, 4800],
    },
    "May 2025": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [4200, 5100, 6300, 5800],
    },
    "June 2025": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [3900, 4800, 5500, 5600],
    },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Get data for selected month
    const data = chartData[selectedMonth]
    if (!data) return

    // Set up chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxValue = Math.max(...data.values) * 1.1 // Add 10% padding

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.setLineDash([5, 5])
    for (let i = 1; i <= gridLines; i++) {
      const y = canvas.height - padding - (i * chartHeight) / gridLines
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)

      // Draw y-axis labels
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`$${Math.round((maxValue * i) / gridLines)}`, padding - 10, y + 4)
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Draw x-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    const barWidth = chartWidth / data.labels.length
    data.labels.forEach((label, i) => {
      const x = padding + i * barWidth + barWidth / 2
      ctx.fillText(label, x, canvas.height - padding + 20)
    })

    // Draw bars
    const barPadding = 10
    data.values.forEach((value, i) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = padding + i * barWidth + barPadding
      const y = canvas.height - padding - barHeight
      const width = barWidth - barPadding * 2

      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
      gradient.addColorStop(1, "rgba(99, 102, 241, 0.2)")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, width, barHeight)

      // Draw value on top of bar
      ctx.fillStyle = "#1e293b"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`$${value}`, x + width / 2, y - 10)
    })
  }, [selectedMonth])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Sales performance for {selectedMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[2/1] w-full">
          <canvas ref={canvasRef} width={800} height={400} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  )
}


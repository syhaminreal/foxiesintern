"use client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 4000,
    profit: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    profit: 1398,
  },
  {
    name: "Mar",
    revenue: 5000,
    profit: 3000,
  },
  {
    name: "Apr",
    revenue: 4000,
    profit: 2780,
  },
  {
    name: "May",
    revenue: 7000,
    profit: 3908,
  },
  {
    name: "Jun",
    revenue: 5000,
    profit: 2800,
  },
  {
    name: "Jul",
    revenue: 6000,
    profit: 3300,
  },
  {
    name: "Aug",
    revenue: 8000,
    profit: 4300,
  },
  {
    name: "Sep",
    revenue: 7000,
    profit: 3800,
  },
  {
    name: "Oct",
    revenue: 9000,
    profit: 5000,
  },
  {
    name: "Nov",
    revenue: 8000,
    profit: 4500,
  },
  {
    name: "Dec",
    revenue: 12000,
    profit: 6000,
  },
]

export function RevenueChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
          <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

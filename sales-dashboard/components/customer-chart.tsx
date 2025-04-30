"use client"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    new: 400,
    returning: 240,
  },
  {
    name: "Feb",
    new: 300,
    returning: 198,
  },
  {
    name: "Mar",
    new: 500,
    returning: 300,
  },
  {
    name: "Apr",
    new: 400,
    returning: 278,
  },
  {
    name: "May",
    new: 700,
    returning: 390,
  },
  {
    name: "Jun",
    new: 500,
    returning: 280,
  },
  {
    name: "Jul",
    new: 600,
    returning: 330,
  },
  {
    name: "Aug",
    new: 800,
    returning: 430,
  },
  {
    name: "Sep",
    new: 700,
    returning: 380,
  },
  {
    name: "Oct",
    new: 900,
    returning: 500,
  },
  {
    name: "Nov",
    new: 800,
    returning: 450,
  },
  {
    name: "Dec",
    new: 1200,
    returning: 600,
  },
]

export function CustomerChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="new" stackId="1" stroke="#8884d8" fill="#8884d8" name="New Customers" />
          <Area
            type="monotone"
            dataKey="returning"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
            name="Returning Customers"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

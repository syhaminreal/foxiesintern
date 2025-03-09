"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentSales({ selectedMonth }) {
  // Mock data for different months
  const salesData = {
    "January 2025": [
      {
        id: "INV001",
        customer: "Alex Johnson",
        email: "alex@example.com",
        amount: "$350.00",
        status: "Paid",
        date: "Jan 12, 2025",
      },
      {
        id: "INV002",
        customer: "Sarah Williams",
        email: "sarah@example.com",
        amount: "$290.00",
        status: "Pending",
        date: "Jan 15, 2025",
      },
      {
        id: "INV003",
        customer: "Michael Brown",
        email: "michael@example.com",
        amount: "$470.00",
        status: "Paid",
        date: "Jan 18, 2025",
      },
      {
        id: "INV004",
        customer: "Emily Davis",
        email: "emily@example.com",
        amount: "$520.00",
        status: "Unpaid",
        date: "Jan 22, 2025",
      },
      {
        id: "INV005",
        customer: "David Miller",
        email: "david@example.com",
        amount: "$180.00",
        status: "Paid",
        date: "Jan 25, 2025",
      },
    ],
    "February 2025": [
      {
        id: "INV006",
        customer: "Jessica Wilson",
        email: "jessica@example.com",
        amount: "$420.00",
        status: "Paid",
        date: "Feb 03, 2025",
      },
      {
        id: "INV007",
        customer: "Ryan Taylor",
        email: "ryan@example.com",
        amount: "$310.00",
        status: "Pending",
        date: "Feb 08, 2025",
      },
      {
        id: "INV008",
        customer: "Olivia Moore",
        email: "olivia@example.com",
        amount: "$550.00",
        status: "Paid",
        date: "Feb 12, 2025",
      },
      {
        id: "INV009",
        customer: "Daniel Anderson",
        email: "daniel@example.com",
        amount: "$280.00",
        status: "Unpaid",
        date: "Feb 18, 2025",
      },
      {
        id: "INV010",
        customer: "Sophia Thomas",
        email: "sophia@example.com",
        amount: "$390.00",
        status: "Paid",
        date: "Feb 23, 2025",
      },
    ],
    "March 2025": [
      {
        id: "INV011",
        customer: "William Jackson",
        email: "william@example.com",
        amount: "$480.00",
        status: "Paid",
        date: "Mar 05, 2025",
      },
      {
        id: "INV012",
        customer: "Ava White",
        email: "ava@example.com",
        amount: "$320.00",
        status: "Pending",
        date: "Mar 10, 2025",
      },
      {
        id: "INV013",
        customer: "James Harris",
        email: "james@example.com",
        amount: "$590.00",
        status: "Paid",
        date: "Mar 15, 2025",
      },
      {
        id: "INV014",
        customer: "Emma Martin",
        email: "emma@example.com",
        amount: "$430.00",
        status: "Unpaid",
        date: "Mar 20, 2025",
      },
      {
        id: "INV015",
        customer: "Benjamin Thompson",
        email: "benjamin@example.com",
        amount: "$510.00",
        status: "Paid",
        date: "Mar 25, 2025",
      },
    ],
    "April 2025": [
      {
        id: "INV016",
        customer: "Mia Garcia",
        email: "mia@example.com",
        amount: "$370.00",
        status: "Paid",
        date: "Apr 04, 2025",
      },
      {
        id: "INV017",
        customer: "Ethan Martinez",
        email: "ethan@example.com",
        amount: "$290.00",
        status: "Pending",
        date: "Apr 09, 2025",
      },
      {
        id: "INV018",
        customer: "Charlotte Robinson",
        email: "charlotte@example.com",
        amount: "$450.00",
        status: "Paid",
        date: "Apr 14, 2025",
      },
      {
        id: "INV019",
        customer: "Alexander Clark",
        email: "alexander@example.com",
        amount: "$380.00",
        status: "Unpaid",
        date: "Apr 19, 2025",
      },
      {
        id: "INV020",
        customer: "Amelia Rodriguez",
        email: "amelia@example.com",
        amount: "$520.00",
        status: "Paid",
        date: "Apr 24, 2025",
      },
    ],
    "May 2025": [
      {
        id: "INV021",
        customer: "Henry Lewis",
        email: "henry@example.com",
        amount: "$410.00",
        status: "Paid",
        date: "May 03, 2025",
      },
      {
        id: "INV022",
        customer: "Abigail Lee",
        email: "abigail@example.com",
        amount: "$330.00",
        status: "Pending",
        date: "May 08, 2025",
      },
      {
        id: "INV023",
        customer: "Sebastian Walker",
        email: "sebastian@example.com",
        amount: "$490.00",
        status: "Paid",
        date: "May 13, 2025",
      },
      {
        id: "INV024",
        customer: "Victoria Hall",
        email: "victoria@example.com",
        amount: "$420.00",
        status: "Unpaid",
        date: "May 18, 2025",
      },
      {
        id: "INV025",
        customer: "Joseph Allen",
        email: "joseph@example.com",
        amount: "$540.00",
        status: "Paid",
        date: "May 23, 2025",
      },
    ],
    "June 2025": [
      {
        id: "INV026",
        customer: "Scarlett Young",
        email: "scarlett@example.com",
        amount: "$390.00",
        status: "Paid",
        date: "Jun 02, 2025",
      },
      {
        id: "INV027",
        customer: "Samuel King",
        email: "samuel@example.com",
        amount: "$310.00",
        status: "Pending",
        date: "Jun 07, 2025",
      },
      {
        id: "INV028",
        customer: "Madison Wright",
        email: "madison@example.com",
        amount: "$470.00",
        status: "Paid",
        date: "Jun 12, 2025",
      },
      {
        id: "INV029",
        customer: "Jack Scott",
        email: "jack@example.com",
        amount: "$400.00",
        status: "Unpaid",
        date: "Jun 17, 2025",
      },
      {
        id: "INV030",
        customer: "Chloe Green",
        email: "chloe@example.com",
        amount: "$530.00",
        status: "Paid",
        date: "Jun 22, 2025",
      },
    ],
  }

  const sales = salesData[selectedMonth] || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Recent transactions for {selectedMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 text-sm font-medium">
              <div>Invoice</div>
              <div>Customer</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {sales.map((sale) => (
                <div key={sale.id} className="grid grid-cols-5 items-center p-4">
                  <div className="font-medium">{sale.id}</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={sale.customer} />
                      <AvatarFallback>{sale.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{sale.customer}</div>
                      <div className="text-xs text-muted-foreground">{sale.email}</div>
                    </div>
                  </div>
                  <div>{sale.date}</div>
                  <div>{sale.amount}</div>
                  <div>
                    <Badge
                      variant={
                        sale.status === "Paid" ? "default" : sale.status === "Pending" ? "outline" : "destructive"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  Home,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <span className="text-lg font-semibold">SalesHub</span>
        </div>
        <div className="flex-1">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <span className="hidden md:inline-flex">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-1">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <BarChart3 className="h-6 w-6" />
                  <span>SalesHub</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="grid gap-2 p-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-accent-foreground transition-all"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Package className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Users className="h-4 w-4" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <CreditCard className="h-4 w-4" />
                  Billing
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r md:flex">
          <nav className="grid gap-2 p-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <CreditCard className="h-4 w-4" />
              Billing
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

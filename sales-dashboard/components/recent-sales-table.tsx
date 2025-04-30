import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentSalesTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Davis</p>
          <p className="text-sm text-muted-foreground">jackson.davis@example.com</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="ml-2">
            Completed
          </Badge>
          <div className="text-sm font-medium">+$129.00</div>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>SO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Oliveira</p>
          <p className="text-sm text-muted-foreground">sofia.oliveira@example.com</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="ml-2">
            Pending
          </Badge>
          <div className="text-sm font-medium">+$39.00</div>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">isabella.n@example.com</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="ml-2">
            Completed
          </Badge>
          <div className="text-sm font-medium">+$299.00</div>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will.kim@example.com</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="ml-2">
            Completed
          </Badge>
          <div className="text-sm font-medium">+$99.00</div>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sarah Daniels</p>
          <p className="text-sm text-muted-foreground">sarah.d@example.com</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" className="ml-2">
            Refunded
          </Badge>
          <div className="text-sm font-medium">-$199.00</div>
        </div>
      </div>
    </div>
  )
}

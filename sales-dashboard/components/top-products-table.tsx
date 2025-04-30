import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function TopProductsTable() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="font-medium">Wireless Headphones</div>
          <Badge className="ml-auto">Trending</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>$129.99</div>
          <div className="ml-auto">1,245 sold</div>
        </div>
        <Progress value={85} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="font-medium">Smart Watch</div>
          <Badge className="ml-auto">Popular</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>$199.99</div>
          <div className="ml-auto">986 sold</div>
        </div>
        <Progress value={70} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="font-medium">Bluetooth Speaker</div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>$89.99</div>
          <div className="ml-auto">756 sold</div>
        </div>
        <Progress value={60} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="font-medium">Laptop Backpack</div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>$59.99</div>
          <div className="ml-auto">652 sold</div>
        </div>
        <Progress value={50} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="font-medium">Wireless Charger</div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>$39.99</div>
          <div className="ml-auto">428 sold</div>
        </div>
        <Progress value={40} className="h-2" />
      </div>
    </div>
  )
}

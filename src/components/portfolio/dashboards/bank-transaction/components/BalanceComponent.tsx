import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchComponent } from "./SearchComponent";
import { DollarSign, CreditCard, Users, Activity } from "lucide-react";

export const BalanceComponent = () => (
  <>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Beneficiares</CardTitle>
        <Users className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-muted-foreground text-xs">+180.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <CreditCard className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+12,234</div>
        <p className="text-muted-foreground text-xs">+19% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        <Activity className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-muted-foreground text-xs">+201 since last hour</p>
      </CardContent>
    </Card>
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Filter transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <SearchComponent />
        </div>
      </CardContent>
    </Card>
  </>
);

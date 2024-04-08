import {
	Activity,
	ArrowUpRight,
	CircleUser,
	CreditCard,
	DollarSign,
	Menu,
	Package2,
	Search,
	Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components-library/ui/avatar";
import { Badge } from "@/components-library/ui/badge";
import { Button } from "@/components-library/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components-library/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components-library/ui/dropdown-menu";
import { Input } from "@/components-library/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components-library/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components-library/ui/table";

export function Dashboard1() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
						<Package2 className="h-6 w-6" />
						<span className="sr-only">Acme Inc</span>
					</a>
					<a href="#" className="text-foreground hover:text-foreground transition-colors">
						Dashboard
					</a>
					<a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
						Orders
					</a>
					<a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
						Products
					</a>
					<a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
						Customers
					</a>
					<a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
						Analytics
					</a>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<a href="#" className="flex items-center gap-2 text-lg font-semibold">
								<Package2 className="h-6 w-6" />
								<span className="sr-only">Acme Inc</span>
							</a>
							<a href="#" className="hover:text-foreground">
								Dashboard
							</a>
							<a href="#" className="text-muted-foreground hover:text-foreground">
								Orders
							</a>
							<a href="#" className="text-muted-foreground hover:text-foreground">
								Products
							</a>
							<a href="#" className="text-muted-foreground hover:text-foreground">
								Customers
							</a>
							<a href="#" className="text-muted-foreground hover:text-foreground">
								Analytics
							</a>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
							<Input
								type="search"
								placeholder="Search products..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
							<CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
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
				</div>
				<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<Card className="xl:col-span-2">
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Transactions</CardTitle>
								<CardDescription>Recent transactions from your store.</CardDescription>
							</div>
							<Button asChild size="sm" className="ml-auto gap-1">
								<a href="#">
									View All
									<ArrowUpRight className="h-4 w-4" />
								</a>
							</Button>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden xl:table-column">Type</TableHead>
										<TableHead className="hidden xl:table-column">Status</TableHead>
										<TableHead className="hidden xl:table-column">Date</TableHead>
										<TableHead className="text-right">Amount</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<div className="font-medium">Liam Johnson</div>
											<div className="text-muted-foreground hidden text-sm md:inline">
												liam@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">Sale</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-23
										</TableCell>
										<TableCell className="text-right">$250.00</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Olivia Smith</div>
											<div className="text-muted-foreground hidden text-sm md:inline">
												olivia@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">Refund</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Declined
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-24
										</TableCell>
										<TableCell className="text-right">$150.00</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Noah Williams</div>
											<div className="text-muted-foreground hidden text-sm md:inline">
												noah@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">Subscription</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-25
										</TableCell>
										<TableCell className="text-right">$350.00</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Emma Brown</div>
											<div className="text-muted-foreground hidden text-sm md:inline">
												emma@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">Sale</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-26
										</TableCell>
										<TableCell className="text-right">$450.00</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Liam Johnson</div>
											<div className="text-muted-foreground hidden text-sm md:inline">
												liam@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">Sale</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-27
										</TableCell>
										<TableCell className="text-right">$550.00</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-8">
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/01.png" alt="Avatar" />
									<AvatarFallback>OM</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">Olivia Martin</p>
									<p className="text-muted-foreground text-sm">olivia.martin@email.com</p>
								</div>
								<div className="ml-auto font-medium">+$1,999.00</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/02.png" alt="Avatar" />
									<AvatarFallback>JL</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">Jackson Lee</p>
									<p className="text-muted-foreground text-sm">jackson.lee@email.com</p>
								</div>
								<div className="ml-auto font-medium">+$39.00</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/03.png" alt="Avatar" />
									<AvatarFallback>IN</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">Isabella Nguyen</p>
									<p className="text-muted-foreground text-sm">isabella.nguyen@email.com</p>
								</div>
								<div className="ml-auto font-medium">+$299.00</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/04.png" alt="Avatar" />
									<AvatarFallback>WK</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">William Kim</p>
									<p className="text-muted-foreground text-sm">will@email.com</p>
								</div>
								<div className="ml-auto font-medium">+$99.00</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/05.png" alt="Avatar" />
									<AvatarFallback>SD</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">Sofia Davis</p>
									<p className="text-muted-foreground text-sm">sofia.davis@email.com</p>
								</div>
								<div className="ml-auto font-medium">+$39.00</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
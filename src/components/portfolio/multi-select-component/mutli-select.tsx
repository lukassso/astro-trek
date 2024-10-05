import React from "react";
import { CheckIcon, XCircle, ChevronDown, XIcon, PlusIcon, Keyboard } from "lucide-react";
import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	Command,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface MultiSelectProps {
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	onValueChange: (value: string[]) => void;
	defaultValue?: string[];
	placeholder?: string;
	maxCount?: number;
	className?: string;
}

export function MultiSelect({
	options,
	onValueChange,
	defaultValue = [],
	placeholder = "Select options",
	maxCount = 3,
	className,
}: MultiSelectProps) {
	const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
	const [open, setOpen] = React.useState(false);
	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const toggleOption = (value: string) => {
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];
		setSelectedValues(newSelectedValues);
		onValueChange(newSelectedValues);
	};

	const handleClear = () => {
		setSelectedValues([]);
		onValueChange([]);
	};

	const toggleAll = () => {
		if (selectedValues.length === options.length) {
			handleClear();
		} else {
			const allValues = options.map((option) => option.value);
			setSelectedValues(allValues);
			onValueChange(allValues);
		}
	};

	const handleTogglePopover = () => {
		setIsPopoverOpen((prev) => !prev);
	};

	return (
		<div className="mx-auto max-w-md">
			<Button
				variant="ghost"
				onClick={() => setOpen(true)}
				className="mb-4 flex items-center border border-green-500 text-green-500"
			>
				<kbd className="bg-muted-foreground rounded px-2 py-1 text-sm">Ctrl+J</kbd>
			</Button>
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild>
					<Button
						onClick={handleTogglePopover}
						className={cn(
							"flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit",
							className,
						)}
					>
						{selectedValues.length > 0 ? (
							<div className="flex w-full items-center justify-between">
								<div className="flex flex-wrap items-center">
									{selectedValues.slice(0, maxCount).map((value) => {
										const option = options.find((o) => o.value === value);
										const IconComponent = option?.icon;
										return (
											<Badge key={value}>
												{IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
												{option?.label}
												<XCircle
													className="ml-2 h-4 w-4 cursor-pointer"
													onClick={(event) => {
														event.stopPropagation();
														toggleOption(value);
													}}
												/>
											</Badge>
										);
									})}
									{selectedValues.length > maxCount && (
										<Badge
											className={cn(
												"text-foreground border-foreground/10 bg-transparent hover:bg-transparent",
											)}
										>
											{`+ ${selectedValues.length - maxCount} more`}
										</Badge>
									)}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="text-muted-foreground mx-2 h-4 cursor-pointer"
										onClick={(event) => {
											event.stopPropagation();
											handleClear();
										}}
									/>
									<Separator orientation="vertical" className="h-full min-h-6" />
									<ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
								</div>
							</div>
						) : (
							<div className="flex w-full max-w-md items-center justify-between">
								<span className="text-muted-foreground mx-3 text-sm">{placeholder}</span>
								<ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-w-md p-0" align="start">
					<Command>
						<CommandInput placeholder="Search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								<CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
									<div
										className={cn(
											"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
											selectedValues.length === options.length
												? "text-primary-foreground bg-primary"
												: "opacity-50 [&_svg]:invisible",
										)}
									>
										<CheckIcon className="h-4 w-4" />
									</div>
									<span>(Select All)</span>
								</CommandItem>
								{options.map((option) => {
									const isSelected = selectedValues.includes(option.value);
									return (
										<CommandItem
											key={option.value}
											onSelect={() => toggleOption(option.value)}
											className="cursor-pointer"
										>
											<div
												className={cn(
													"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
													isSelected
														? "text-primary-foreground bg-primary"
														: "opacity-50 [&_svg]:invisible",
												)}
											>
												<CheckIcon className="h-4 w-4" />
											</div>
											{option.icon && (
												<option.icon className="text-muted-foreground mr-2 h-4 w-4" />
											)}
											<span>{option.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<div className="flex items-center justify-between">
									{selectedValues.length > 0 && (
										<CommandItem
											onSelect={handleClear}
											className="flex-1 cursor-pointer justify-center"
										>
											Clear
										</CommandItem>
									)}
									<CommandItem
										onSelect={handleTogglePopover}
										className="max-w-full flex-1 cursor-pointer justify-center"
									>
										Close
									</CommandItem>
								</div>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search or select options..." />

				{/* Display selected values under search input */}
				{selectedValues.length > 0 && (
					<div className="border-b border-gray-200 px-4 py-2">
						<div className="flex flex-wrap gap-2">
							{selectedValues.map((value) => {
								const option = options.find((o) => o.value === value);
								return (
									<Badge key={value} className="flex items-center">
										{option?.label}
										<XCircle
											className="ml-2 h-4 w-4 cursor-pointer"
											onClick={() => toggleOption(value)}
										/>
									</Badge>
								);
							})}
						</div>
					</div>
				)}

				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Options">
						<CommandItem onSelect={toggleAll} className="cursor-pointer">
							<CheckIcon className="mr-2 h-4 w-4" />
							<span>
								{selectedValues.length === options.length ? "Deselect All" : "Select All"}
							</span>
						</CommandItem>
						{options.map((option) => {
							const isSelected = selectedValues.includes(option.value);
							return (
								<CommandItem
									key={option.value}
									onSelect={() => toggleOption(option.value)}
									className="cursor-pointer"
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											isSelected ? "text-primary-foreground" : "opacity-0",
										)}
									/>
									{option.icon && <option.icon className="mr-2 h-4 w-4" />}
									<span>{option.label}</span>
								</CommandItem>
							);
						})}
					</CommandGroup>
					<CommandSeparator />
					{selectedValues.length > 0 && (
						<CommandGroup heading="Selected Options">
							{selectedValues.slice(0, maxCount).map((value) => {
								const option = options.find((o) => o.value === value);
								return (
									<CommandItem
										key={value}
										onSelect={() => toggleOption(value)}
										className="cursor-pointer"
									>
										<XCircle className="mr-2 h-4 w-4" />
										{option?.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</div>
	);
}

import { useRef, useEffect, useState } from "react";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";
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
import { useMediaQuery } from "@/utils/hooks/use-media-query";

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
	const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
	const [open, setOpen] = useState(false);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const popoverContentRef = useRef<HTMLDivElement>(null);
	const isMobile = useMediaQuery("(max-width: 768px)");

	useEffect(() => {
		if (triggerRef.current && popoverContentRef.current) {
			popoverContentRef.current.style.width = `${triggerRef.current.offsetWidth}px`;
		}
	}, []);

	useEffect(() => {
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
		if (isMobile) {
			setOpen(true);
			setIsPopoverOpen(true);
		} else {
			setIsPopoverOpen((prev) => !prev);
		}
	};

	const handleCloseDialog = () => {
		setOpen(false);
		setIsPopoverOpen(false);
	};

	return (
		<div className="mx-auto w-full max-w-md">
			{!isMobile && (
				<Button
					ref={triggerRef}
					
					variant="ghost"
					onClick={() => setOpen(true)}
					className="mb-4 flex items-center border border-green-500 text-green-500"
				>
					<kbd className="bg-muted-foreground rounded px-2 py-1 text-sm">Ctrl+J</kbd>
				</Button>
			)}
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild className="w-full">
					<Button
						ref={triggerRef}
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
											<Badge key={value} className="flex items-center mr-1">
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
										
										>
											{`+ ${selectedValues.length - maxCount} more`}
										</Badge>
									)}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="mx-2 h-4 text-gray-950"
										onClick={(event) => {
											event.stopPropagation();
											handleClear();
										}}
									/>
									<Separator orientation="vertical" className="h-full min-h-6" />
									<ChevronDown className="text-gray-950 mx-2 h-4 cursor-pointer" />
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
				<PopoverContent
					ref={popoverContentRef}
					className="p-0"
					align="start"
					style={{ width: triggerRef.current ? `${triggerRef.current.offsetWidth}px` : 'auto' }}
				>
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
			<CommandDialog 
				open={isMobile ? isPopoverOpen || open : open} 
				onOpenChange={handleCloseDialog}
			>
				<div className={cn(
					isMobile && "h-screen flex flex-col"
				)}>
					<CommandInput 
						placeholder="Search or select options..." 
						className={cn(
							isMobile && "h-14"
						)}
					/>
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

					<CommandList className={cn(
						isMobile && "flex-1 max-h-[80vh]"
					)}>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Options">
							<CommandItem onSelect={toggleAll} className="cursor-pointer">
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
										{option.icon && <option.icon className="mr-2 h-4 w-4" />}
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</div>
			</CommandDialog>
		</div>
	);
}

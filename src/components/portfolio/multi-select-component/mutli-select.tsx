"use client";

import * as React from "react";
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
} from "@/components/ui/command";

interface MultiSelectProps {
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	onValueChange: (value: string[]) => void;
	defaultValue: string[];
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

	return (
		<>
			<Button onClick={() => setOpen(true)} className="mb-4">
				Open MultiSelect
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search or select options..." />
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

			<div className="mt-4 flex flex-wrap items-center gap-2">
				{selectedValues.length > 0 ? (
					selectedValues.slice(0, maxCount).map((value) => {
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
					})
				) : (
					<span className="text-muted-foreground">{placeholder}</span>
				)}
				{selectedValues.length > maxCount && (
					<Badge className="flex items-center">+{selectedValues.length - maxCount} more</Badge>
				)}
			</div>
		</>
	);
}

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SettingsFormComponent } from "./SettingsForm.component";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const DrawerComponent = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Settings className="size-4" />
        <span className="sr-only">Settings</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent className="max-h-[80vh]">
      <DrawerHeader>
        <DrawerTitle>Configuration</DrawerTitle>
        <DrawerDescription>I'm excited to launch this feature in the future.</DrawerDescription>
      </DrawerHeader>
      <SettingsFormComponent />
    </DrawerContent>
  </Drawer>
);

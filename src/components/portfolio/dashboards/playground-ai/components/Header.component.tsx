import { DrawerComponent } from "./Drawer.component";

export const HeaderComponent = () => (
  <header className="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
    <h1 className="text-xl font-semibold">Playground</h1>
    <DrawerComponent />
  </header>
);

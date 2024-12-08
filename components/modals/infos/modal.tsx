import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Balance } from './balance';
import { Chart } from './chart';
import { Description } from './description';
import { Header } from './header';
import { Informations } from './informations';

export function Infos({
  openInfo,
  setOpenInfo,
}: {
  openInfo: boolean;
  setOpenInfo: (open: boolean) => void;
}) {
  return (
    <Drawer open={openInfo} onOpenChange={setOpenInfo}>
      <DrawerContent className="flex h-[100vh] flex-col">
        <DrawerHeader className="p-0">
          <DrawerTitle className="p-0">
            <Header />
          </DrawerTitle>
        </DrawerHeader>

        <Chart />
        <Balance />
        <Separator className="mx-auto w-[90%]" />
        <Informations />
        <Separator className="mx-auto w-[90%]" />
        <Description />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button flat className="flex items-center justify-center text-2xl">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

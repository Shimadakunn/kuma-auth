import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export function OnrampModal({
  openOnramp,
  setOpenOnramp,
}: {
  openOnramp: boolean;
  setOpenOnramp: (open: boolean) => void;
}) {
  return (
    <Drawer open={openOnramp} onOpenChange={setOpenOnramp}>
      <DrawerContent>
        <DrawerHeader className="p-0">
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center justify-center pb-4">
          <iframe
            allow="usb; ethereum; clipboard-write; payment; microphone; camera"
            loading="lazy"
            src={`https://widget.mtpelerin.com/?lang=en&_ctkn=${process.env.NEXT_PUBLIC_MT_PELERIN_API}&tabs=buy&nets=arbitrum_mainnet&bsc=EUR&bdc=USDC&crys=USDC`}
            title="Mt Pelerin exchange widget"
            height="700px"
            width="420px"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

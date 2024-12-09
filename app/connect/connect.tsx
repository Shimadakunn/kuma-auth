import { Button } from '@/components/ui/button';
import { useMe } from '@/providers';

export default function Home() {
  const { get, me } = useMe();

  const connect = async () => {
    await get();
    if (me) {
      const appRedirectUrl = `kuma://home?address=${me.account}`;
      window.location.href = appRedirectUrl;
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div className="relative flex h-[100vh] w-full flex-col items-center justify-between">
      <div className=" flex h-16 w-full items-center justify-start px-4">
        <h1 className="text-2xl font-black">Kuma</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-black">Connect Account</h1>
      </div>
      <div className="mb-8 flex h-16 w-full items-center justify-center">
        <Button onClick={connect} className="">
          Connect
        </Button>
      </div>
    </div>
  );
}

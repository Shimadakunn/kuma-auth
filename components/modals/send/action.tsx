import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function SendAction() {
  return (
    <Button className="mx-auto mb-3 w-[90%] bg-main text-white">
      <Send size={22} color="white" strokeWidth={2.5} className="mr-1" />
      Send
    </Button>
  );
}

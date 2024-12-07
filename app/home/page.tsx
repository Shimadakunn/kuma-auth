'use client';

import { useToast } from '@/hooks/use-toast';
import { Actions } from './actions';
import { Balance } from './balance';
import { Chart } from './chart';
import { Header } from './header';
import { Infos } from './stats';

const Home = () => {
  const { toast } = useToast();
  return (
    <div className="h-[100vh] w-full border">
      <Header />
      <Balance />
      <button
        onClick={() => {
          console.log('click');
          toast({
            title: 'This is a sonner toast',
          });
        }}>
        Click me
      </button>
      <Chart />
      <Infos />
      <Actions />
    </div>
  );
};

export default Home;

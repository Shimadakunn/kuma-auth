import { tokens } from '@/constants';
import Image from 'next/image';

export function AmountView({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <div className="my-2 px-5">
      <div className="flex items-center justify-between">
        <div>
          {value ? (
            <p className="px-1 font-[Gaeil] text-5xl font-black">{value}</p>
          ) : (
            <p className="px-1 font-[Gaeil] text-5xl font-bold text-gray-400">
              0 {tokens.usdc.coin}
            </p>
          )}
          <p className="px-1 text-sm font-bold text-gray-400">
            Max:{' '}
            <span className="font-[Gaeil]">
              {tokens.usdc.balance} {tokens.usdc.coin}
            </span>
          </p>
        </div>
        <Image src={tokens.usdc.icon} alt={tokens.usdc.name} width={50} height={50} />
      </div>
      <div className="flex items-center justify-around py-2">
        <button
          className="font-bold text-gray-400"
          onClick={() => onChangeText((Number(tokens.usdc.balance) * 0.1).toString())}>
          10%
        </button>
        <button
          className="font-bold text-gray-400"
          onClick={() => onChangeText((Number(tokens.usdc.balance) * 0.25).toString())}>
          25%
        </button>
        <button
          className="font-bold text-gray-400"
          onClick={() => onChangeText((Number(tokens.usdc.balance) * 0.5).toString())}>
          50%
        </button>
        <button
          className="font-bold text-gray-400"
          onClick={() => onChangeText((Number(tokens.usdc.balance) * 0.75).toString())}>
          75%
        </button>
        <button
          className="font-bold text-gray-400"
          onClick={() => onChangeText(tokens.usdc.balance)}>
          100%
        </button>
      </div>
    </div>
  );
}
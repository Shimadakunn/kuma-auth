import { useMe } from '@/providers';
import { QrCode } from 'react-qrcode-pretty';

export const QRCode = () => {
  const { me } = useMe();
  return (
    <QrCode
      value={me!.account!}
      image={'/morpho.svg'}
      level="L"
      variant={{
        eyes: 'fluid',
        body: 'rounded',
      }}
      color={{
        eyes: '#556CDE',
        body: '#556CDE',
      }}
      padding={0}
      margin={0}
      bgColor="#fff"
      bgRounded
      divider
    />
  );
};

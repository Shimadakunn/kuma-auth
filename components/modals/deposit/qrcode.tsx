import { QrCode } from 'react-qrcode-pretty';

export const QRCode = () => {
  return (
    <QrCode
      value={'as;ldkfjaslfdkjsadl;fkjasdf'}
      image={'/logo.png'}
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

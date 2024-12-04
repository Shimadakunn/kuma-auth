export const steps: any = [
  {
    tour: "firsttour",
    steps: [
      {
        icon: <>👋</>,
        title: "Welcome to the Kuma!",
        content: (
          <>
            Kuma is a platform that simplify the interaction with L2s
            Blockchains.
          </>
        ),
        selector: "#step1",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>💰</>,
        title: "Your balance",
        content: <>Here you can see the total balance of your wallet.</>,
        selector: "#step2",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>💎</>,
        title: "Tokens",
        content: (
          <>
            Here you can see the tokens you have in your wallet. Click on it to
            see more info!
          </>
        ),
        selector: "#step3",
        side: "top",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>📸</>,
        title: "Wallet Connect",
        content: (
          <>Wallet Connect is integrated. Click on it to connect to any dapp!</>
        ),
        selector: "#step4",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>💳</>,
        title: "Faucet",
        content: <>You can get some tokens for free by clicking on it!</>,
        selector: "#step5",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>⛽</>,
        title: "Gas Tank",
        content: (
          <>
            You will need gas to interact with the blockchain. Click on it to
            add some and begin your journey!
          </>
        ),
        selector: "#step6",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
    ],
  },
  {
    tour: "financetour",
    steps: [
      {
        icon: <>👋</>,
        title: "Welcome to the Finance Tab!",
        content: (
          <>
            Kuma let you interact with DeFi protocols in a simple way and earn
            yield.
          </>
        ),
        selector: "#step1",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>💰</>,
        title: "Supplied Balance",
        content: (
          <>Here you can see the total balance of your supplied assets.</>
        ),
        selector: "#s2",
        side: "bottom",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>👆</>,
        title: "Interact",
        content: (
          <>
            Here you can see infos about DeFi protocols and click to interact
            with them.
          </>
        ),
        selector: "#s3",
        side: "top",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
      },
    ],
  },
];

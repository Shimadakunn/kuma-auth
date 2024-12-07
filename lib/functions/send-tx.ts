import {
  Address,
  EstimateFeesPerGasReturnType,
  Hex,
  encodeFunctionData,
  parseEther,
  parseUnits,
} from "viem";

import { ERC20_ABI, TokenType, chains } from "@/constants";
import { smartWallet } from "@/lib/smart-wallet";
import { UserOpBuilder, emptyHex } from "@/lib/smart-wallet/service/userOps";

const builder = new UserOpBuilder();

type Me = { account: Address; keyId: Hex; pubKey: { x: Hex; y: Hex } };

export async function SendTx(
  token: TokenType,
  me: Me,
  amount: string,
  destination: string,
  setIsLoading: (loading: boolean) => void,
  refreshBalance: () => void,
  setError: (error: any) => void
) {
  setIsLoading(true);
  try {
    smartWallet.init(chains.arbitrum);
    builder.init(chains.arbitrum);

    const { maxFeePerGas, maxPriorityFeePerGas }: EstimateFeesPerGasReturnType =
      await smartWallet.client.estimateFeesPerGas();

    let value = parseEther(amount);
    let calls = [
      {
        dest: destination.toLowerCase() as Hex,
        value,
        data: emptyHex,
      },
    ];
    if (token.address) {
      console.log("sending Erc20");
      value = parseEther("0");
      calls = SendErc20(token, me, amount, destination);
    } else {
      console.log("sending Eth");
    }

    const userOp = await builder.buildUserOp({
      calls,
      maxFeePerGas: maxFeePerGas as bigint,
      // maxPriorityFeePerGas: BigInt(5_000_000) as bigint,
      maxPriorityFeePerGas: maxPriorityFeePerGas as bigint,
      keyId: me?.keyId as Hex,
    });
    console.log("userOp", userOp);
    const hash = await smartWallet.sendUserOperation({ userOp });
    if (hash === null) {
      throw new Error("Transaction failed");
    }
    const receipt = await smartWallet.waitForUserOperationReceipt({ hash });
    refreshBalance();
    setIsLoading(false);
    return receipt;
  } catch (e: any) {
    console.error(e);
    setError(e);
    setIsLoading(false);
    return e;
  }
}

function SendErc20(
  token: TokenType,
  me: Me,
  amount: string,
  destination: string
) {
  const approve = {
    dest: token.address as Hex,
    value: parseEther("0"),
    data: encodeFunctionData({
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [destination as Hex, parseUnits(amount, 6)],
    }),
  };
  return [approve];
}

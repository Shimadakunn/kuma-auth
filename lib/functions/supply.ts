import { smartWallet } from "@/lib/smart-wallet";
import { UserOpBuilder } from "@/lib/smart-wallet/service/userOps";
import {
  Address,
  EstimateFeesPerGasReturnType,
  Hex,
  encodeFunctionData,
  parseEther,
  parseUnits,
} from "viem";

import {
  AAVE_ABI,
  AAVE_IPOOL_ABI,
  ContractType,
  ERC20_ABI,
  TokenType,
  chains,
} from "@/config";

const builder = new UserOpBuilder();

type Me = { account: Address; keyId: Hex; pubKey: { x: Hex; y: Hex } };

export async function Supply(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string,
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

    let calls;
    if (token.address) {
      calls = SupplyErc20Aave(contract, token, me, amount);
    } else {
      calls = SupplyEthAave(contract, token, me, amount);
    }

    const userOp = await builder.buildUserOp({
      calls,
      maxFeePerGas: maxFeePerGas as bigint,
      maxPriorityFeePerGas: maxPriorityFeePerGas as bigint,
      keyId: me?.keyId as Hex,
    });
    console.log("userOp", userOp);
    const hash = await smartWallet.sendUserOperation({ userOp });
    if (hash === null) {
      throw new Error("Transaction failed");
    }
    console.log("user op sent", hash);
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

function SupplyEthAave(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string
) {
  const calls = [
    {
      dest: contract.address as Hex,
      value: parseEther(amount),
      data: encodeFunctionData({
        abi: AAVE_ABI,
        functionName: "depositETH",
        args: [contract.ipoolAddress as Hex, me!.account, 0],
      }),
    },
  ];
  return calls;
}

function SupplyErc20Aave(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string
) {
  const approve = {
    dest: token.address as Hex,
    value: parseUnits("0", 6),
    data: encodeFunctionData({
      abi: ERC20_ABI,
      functionName: "approve",
      args: [contract.ipoolAddress as Hex, parseUnits(amount, 6)],
    }),
  };
  const supply = {
    dest: contract.ipoolAddress as Hex,
    value: parseUnits("0", 6),
    data: encodeFunctionData({
      abi: AAVE_IPOOL_ABI,
      functionName: "supply",
      args: [token.address as Hex, parseUnits(amount, 6), me!.account, 0],
    }),
  };

  return [approve, supply];
}

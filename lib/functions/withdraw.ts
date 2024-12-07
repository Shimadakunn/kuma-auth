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
} from "@/constants";

const builder = new UserOpBuilder();

type Me = { account: Address; keyId: Hex; pubKey: { x: Hex; y: Hex } };

export async function Withdraw(
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
      calls = WithdrawErc20Aave(contract, token, me, amount);
    } else {
      calls = WithdrawEthAave(contract, token, me, amount);
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
    console.log("hash", hash);
    const receipt = await smartWallet.waitForUserOperationReceipt({ hash });
    console.log("receipt", receipt);
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

function WithdrawEthAave(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string
) {
  const approve = {
    dest: token.address as Hex,
    value: parseEther("0"),
    data: encodeFunctionData({
      abi: ERC20_ABI,
      functionName: "approve",
      args: [contract.address as Hex, parseEther(amount)],
    }),
  };
  const withdraw = {
    dest: contract.address as Hex,
    value: parseEther("0"),
    data: encodeFunctionData({
      abi: AAVE_ABI,
      functionName: "withdrawETH",
      args: [contract.ipoolAddress as Hex, parseEther(amount), me!.account],
    }),
  };

  return [approve, withdraw];
}

function WithdrawErc20Aave(
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
      functionName: "withdraw",
      args: [token.address as Hex, parseUnits(amount, 6), me!.account],
    }),
  };

  return [approve, supply];
}

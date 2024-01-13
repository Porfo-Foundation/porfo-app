export interface SwapParams {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  chainId: number;
}

export interface SwapResp {
  quote: string;
  calldata: string;
}

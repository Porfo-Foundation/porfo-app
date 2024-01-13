export interface IPortfolio {
  name: string;
  baseCoin: ICoin;
  stableCoin: ICoin;
  coins: ISelectedCoin[];
}

export interface IEoA {
  walletAddress: string;
  balances: ICoinBalance[];
  transactions: ITransaction[];
}

export interface ICoin {
  symbol: string;
  address: string;
  chainId: number;
  coinId?: string;
  decimals: number;
  graphAddress: string;
  isMain: boolean;
  isStable: boolean;
  logoURI: string;
  name: string;
  onramper: boolean;
  onrapmerId?: string;
  priceChange1h: number;
  priceChange24h: number;
  priceChange30d: number;
  priceChange7d: number;
  usdPrice: number;
  marketCap: number;
  volume24h: number;
  id: string;
}
export interface ISelectedCoin {
  coin: ICoin;
  percentage: string;
  amount: number;
  avgPrice: number;
}

export interface ICoinBalance {
  pnl: number;
  coin: string | ICoin;
  value: number;
  symbol: string;
  receiveTxns: number;
  avgPrice: number;
}

export interface IPopulatedBalance extends ICoinBalance {
  coin: ICoin;
  pnl: number;
}

export interface IBalanceData {
  balances: IPopulatedBalance[];
  totalPnl: number;
  totalInvestedBalanceInUSD: number;
  totalCurrentBalanceInUSD: number;
}
export interface IChatMessage {
  role: string;
  content: string;
  timeStamp: number;
  taskId?: string;
  status?: string;
}

export interface IChatResponse {
  data: IChatMessage[];
  nextCursor: number | null;
  previousCursor: number | null;
}

export interface ITransaction {
  xChainTrxnId?: string;
  hash: string;
  fromAddress: string;
  toAddress: string;
  value: number;
  gas: number;
  gasPrice: number;
  txnType: string;
  txTime: number;
  chainId: number;
  coin: string | ICoin;
  blockNumber: number;
  txnStatus: boolean;
}

export interface IXChainTxn {
  lockId: string;
  blockNumber: number;
  fee: string;
  fromNetwork: string;
  fromToken: string;
  gasAmount?: string;
  inputAmount: string;
  lockHash: string;
  logIndex: number;
  outputAmount: string;
  processed: boolean;
  releaseAmount?: string;
  releaseHash?: string;
  retries: number;
  timestamp: number;
  toNetwork: string;
  toToken: string;
  transactionIndex: number;
  user: string;
  id: string;
}

export interface IPopulatedTransaction extends ITransaction {
  coin: ICoin;
}
export interface IPortfolioAndEoas extends IPortfolio {
  isWatchable?: boolean;
}

export interface IAuth {
  isRecoveryAvailable: boolean;
  tokens: {
    access: {
      expires: string;
      token: string;
    };
    refresh: {
      expires: string;
      token: string;
    };
  };
  user: {
    email?: string;
    mobile?: string;
    id: string;
    name: string;
    role: string;
    smartAccounts: Array<string>;
  };
}

import Network from './network';

export default interface Coin {
  asset: string;
  depositAllEnable: boolean;
  available: number;
  freeze: number;
  ipoable: number;
  ipoing: number;
  isLegalMoney: boolean;
  locked: number;
  storage: number;
  trading: boolean;
  withdrawAllEnable: boolean;
  name: string;
  withdrawing: number;
  networkList: Network[];
}

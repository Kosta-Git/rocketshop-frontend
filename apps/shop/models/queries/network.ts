export default interface Network {
  addressRegex: string;
  asset: string;
  depositDescription: string;
  depositEnabled: boolean;
  isDefault: boolean;
  memoRegex: string;
  minConfirmations: number;
  name: string;
  network: string;
  resetAddressStatus: boolean;
  specialTips: string;
  unlockConfirm: number;
  withdrawDescription: string;
  withdrawEnabled: boolean;
  withdrawFee: number;
  withdrawMin: number;
  withdrawIntegerMultiple: number;
  withdrawMax: number;
  sameAddress: boolean;
}

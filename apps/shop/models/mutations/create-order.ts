export default interface CreateOrder {
  userGuid: string;
  walletAddress: string;
  walletAddressTag?: string;
  network: string;
  amount: number;
  coin: string;
}

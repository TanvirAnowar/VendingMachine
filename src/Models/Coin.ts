export default class Coin{
    CoinType: string;
    CoinCount: number;

    constructor(coinType: string, coinCount: number)
    {
        this.CoinType = coinType;
        this.CoinCount = coinCount;
    }
}
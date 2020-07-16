import { ExceptionCode } from '../Common/ExceptionCode';
import  {CoinType}  from "../Constants/CoinType";

export default class AccountsValidator {
    static IsValidCoin(coin: number): boolean {
      if (!Number.isInteger(coin)) {
        throw new Error(ExceptionCode.INVALID_COIN_INPUT);
      }

      if (coin < 0) {
        throw new Error(ExceptionCode.INVALID_COIN_INPUT);
      } else if (
        coin == Number.parseInt(CoinType.Dimes.toString()) ||
        coin == Number.parseInt(CoinType.Nickels.toString()) ||
        coin == Number.parseInt(CoinType.Quarters.toString())
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
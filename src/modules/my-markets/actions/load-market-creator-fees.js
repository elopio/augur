import { augur, abi } from '../../../services/augurjs';

import { updateMarketCreatorFees } from '../../my-markets/actions/update-market-creator-fees';

export function loadMarketCreatorFees(marketID) {
  return (dispatch) => {
    augur.api.MarketCreator.getMarketCreatorFeesCollected({ market: marketID }, (fees) => {
      if (fees) {
        const marketFees = {};
        marketFees[marketID] = abi.bignum(fees);
        dispatch(updateMarketCreatorFees(marketFees));
      }
    });
  };
}

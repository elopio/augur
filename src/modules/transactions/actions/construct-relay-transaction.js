import { abi, augur, rpc } from '../../../services/augurjs';
import { ZERO } from '../../trade/constants/numbers';
import { updateTradeCommitment } from '../../trade/actions/update-trade-commitment';
import { deleteTransaction } from '../../transactions/actions/delete-transaction';
import { constructBasicTransaction, constructTradingTransaction, constructTransaction } from '../../transactions/actions/construct-transaction';
import unpackTransactionParameters from '../../transactions/actions/unpack-transaction-parameters';
import { selectMarketFromEventID } from '../../market/selectors/market';
import selectWinningPositions from '../../my-positions/selectors/winning-positions';
import selectOrder from '../../bids-asks/selectors/select-order';

export const constructRelayTransaction = (tx, status) => (dispatch, getState) => {
  const hash = tx.response.hash;
  const p = {
    ...unpackTransactionParameters(tx),
    transactionHash: hash,
    blockNumber: tx.response.blockNumber,
    timestamp: tx.response.timestamp || parseInt(Date.now() / 1000, 10),
    inProgress: !tx.response.blockHash
  };
  console.log('unpacked:', JSON.stringify(p, null, 2));
  const method = tx.data.method;
  const contracts = augur.contracts;
  const contract = Object.keys(contracts).find(c => contracts[c] === tx.data.to);
  const gasFees = tx.response.gasFees ? tx.response.gasFees : augur.getTxGasEth({
    ...augur.api.functions[contract][method]
  }, rpc.gasPrice).toFixed();
  switch (method) {
    case 'buy':
      return dispatch(constructTradingTransaction('log_add_tx', {
        type: 'buy',
        ...p,
        price: abi.unfix_signed(p.price, 'string'),
        amount: abi.unfix(p.amount, 'string'),
        gasFees
      }, p.market, p.outcome, status));
    case 'shortAsk':
    case 'sell':
      p.isShortAsk = p.isShortAsk ? !!parseInt(p.isShortAsk, 16) : true;
      return dispatch(constructTradingTransaction('log_add_tx', {
        type: 'sell',
        ...p,
        price: abi.unfix_signed(p.price, 'string'),
        amount: abi.unfix(p.amount, 'string'),
        gasFees
      }, p.market, p.outcome, status));
    case 'cancel': {
      const order = selectOrder(p.trade_id);
      return dispatch(constructTradingTransaction('log_cancel', {
        ...p,
        ...order,
        gasFees
      }, order.market, order.outcome, status));
    }
    case 'commitTrade': {
      dispatch(updateTradeCommitment({ transactionHash: hash }));
      const { tradeHash, orders, tradingFees, maxValue, maxAmount, gasFees } = getState().tradeCommitment;
      const numTradeIDs = orders.length;
      const transactions = new Array(numTradeIDs);
      for (let i = 0; i < numTradeIDs; ++i) {
        const order = orders[i];
        const amount = abi.bignum(maxAmount).gt(ZERO) ?
					maxAmount :
					abi.bignum(maxValue).minus(abi.bignum(tradingFees)).dividedBy(abi.bignum(order.price)).toFixed();
        transactions[i] = dispatch(constructTradingTransaction('log_fill_tx', {
          ...p,
          inProgress: true,
          price: order.price,
          outcome: parseInt(order.outcome, 10),
          amount,
          sender: tx.data.from,
          owner: order.owner,
          type: order.type === 'buy' ? 'sell' : 'buy',
          tradeid: order.id,
          tradeHash,
          takerFee: tradingFees,
          gasFees
        }, order.market, order.outcome, 'committing'));
      }
      return transactions;
    }
    case 'short_sell': {
      const { transactionHash, orders, tradeHash, maxAmount, tradingFees, gasFees } = getState().tradeCommitment;
      const order = orders[0];
      dispatch(deleteTransaction(`${transactionHash}-${p.buyer_trade_id}`));
      return dispatch(constructTradingTransaction('log_short_fill_tx', {
        ...p,
        price: order.price,
        outcome: parseInt(order.outcome, 10),
        amount: maxAmount,
        sender: tx.data.from,
        owner: order.owner,
        tradeid: p.buyer_trade_id,
        tradeHash,
        takerFee: tradingFees,
        gasFees
      }, order.market, order.outcome, status));
    }
    case 'trade': {
      const { transactionHash, orders, tradeHash, tradingFees, maxValue, maxAmount, gasFees } = getState().tradeCommitment;
      const numTradeIDs = p.trade_ids.length;
      const transactions = new Array(numTradeIDs);
      for (let i = 0; i < numTradeIDs; ++i) {
        const order = orders[i];
        const amount = abi.bignum(maxAmount).gt(ZERO) ?
					maxAmount :
					abi.bignum(maxValue).minus(abi.bignum(tradingFees)).dividedBy(abi.bignum(order.price)).toFixed();
        dispatch(deleteTransaction(`${transactionHash}-${order.id}`));
        transactions[i] = dispatch(constructTradingTransaction('log_fill_tx', {
          ...p,
          price: order.price,
          outcome: parseInt(order.outcome, 10),
          amount,
          sender: tx.data.from,
          owner: order.owner,
          type: order.type === 'buy' ? 'sell' : 'buy',
          tradeid: order.id,
          tradeHash,
          takerFee: tradingFees,
          gasFees
        }, order.market, order.outcome, status));
      }
      return transactions;
    }
    default: {
      let transaction;
      switch (method) {
        case 'fundNewAccount':
          transaction = dispatch(constructTransaction('fundedAccount', p));
          break;
        case 'submitReport':
          transaction = dispatch(constructTransaction('submittedReport', {
            ...p, // { event, report, salt }
            ethics: parseInt(p.ethics, 16)
          }));
          break;
        case 'submitReportHash':
          transaction = dispatch(constructTransaction('submittedReportHash', {
            ...p, // { event, encryptedReport, encryptedSalt }
            ethics: parseInt(p.ethics, 16)
          }));
          break;
        case 'penalizeWrong': {
          const { eventsWithSubmittedReport } = getState();
          if (!parseInt(p.event, 16) || !eventsWithSubmittedReport || !eventsWithSubmittedReport[p.event]) {
            return null;
          }
          const market = selectMarketFromEventID(p.event);
          if (!market) return null;
          transaction = dispatch(constructTransaction('penalize', {
            ...p, // { event }
            reportValue: eventsWithSubmittedReport[p.event].accountReport,
            outcome: market.reportedOutcome
          }));
          break;
        }
        case 'penalizationCatchup': {
          const { lastPeriodPenalized, reportPeriod } = getState().branch;
          transaction = dispatch(constructTransaction('penalizationCaughtUp', {
            ...p,
            penalizedFrom: lastPeriodPenalized,
            penalizedUpTo: reportPeriod
          }));
          break;
        }
        case 'collectFees': {
          const { branch, loginAccount } = getState();
          transaction = dispatch(constructTransaction('collectedFees', {
            ...p,
            initialRepBalance: loginAccount.rep,
            notReportingBond: abi.unfix(tx.data.value, 'string'),
            period: branch.lastPeriodPenalized
          }));
          break;
        }
        case 'claimProceeds': {
          const { outcomesData, transactionsData } = getState();
          let shares;
          if (transactionsData[hash] && transactionsData[hash].data.shares) {
            shares = transactionsData[hash].data.shares;
          } else {
            const winningPositions = selectWinningPositions(outcomesData);
            shares = (winningPositions.find(position => position.id === p.market) || {}).shares;
          }
          transaction = dispatch(constructTransaction('payout', { ...p, shares }));
          break;
        }
        case 'send':
        case 'sendFrom':
          transaction = dispatch(constructTransaction('sentCash', {
            ...p,
            _from: abi.format_address(p.from),
            _to: abi.format_address(p.recver),
            _value: abi.unfix(p.value, 'string')
          }));
          break;
        case 'sendEther':
          transaction = dispatch(constructTransaction('sentEther', {
            ...p,
            _from: abi.format_address(p.from),
            _to: abi.format_address(p.to),
            _value: abi.unfix(p.value, 'string')
          }));
          break;
        case 'transfer':
        case 'sendReputation':
          transaction = dispatch(constructTransaction('Transfer', {
            ...p,
            _from: abi.format_address(tx.data.from),
            _to: abi.format_address(p.recver),
            _value: abi.unfix(p.value, 'string')
          }));
          break;
        case 'approve':
          transaction = dispatch(constructTransaction('Approve', {
            ...p,
            _spender: abi.format_address(p.spender)
          }));
          break;
        case 'register':
          transaction = dispatch(constructTransaction('registration', {
            ...p,
            sender: abi.format_address(tx.data.from)
          }));
          break;
        case 'createMarket':
        case 'createSingleEventMarket': {
          const { baseReporters, numEventsCreatedInPast24Hours, numEventsInReportPeriod, periodLength } = getState().branch;
          transaction = dispatch(constructTransaction('marketCreated', {
            ...p,
            eventBond: augur.calculateValidityBond(p.tradingFee, periodLength, baseReporters, numEventsCreatedInPast24Hours, numEventsInReportPeriod),
            marketCreationFee: abi.unfix(augur.calculateRequiredMarketValue(rpc.gasPrice), 'string')
          }));
          break;
        }
        default:
          return null;
      }
      return {
        [hash]: {
          ...constructBasicTransaction(hash, status, p.blockNumber, p.timestamp, gasFees),
          ...transaction
        }
      };
    }
  }
};
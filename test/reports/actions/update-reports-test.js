import {
	assert
} from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testState from '../../testState';
import * as action from '../../../src/modules/reports/actions/update-reports';

describe(`modules/reports/actions/update-reports.js`, () => {
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	let store, out, test;
	let state = Object.assign({}, testState);
	store = mockStore(state);

	beforeEach(() => {
		store.clearActions();
	});

	afterEach(() => {
		store.clearActions();
	});

	it(`should load reports given marketdata`, () => {
		out = [{
			type: 'UPDATE_REPORTS',
			reports: {
				test: {
					_id: 'test',
					data: 'test'
				},
				test2: {
					_id: 'test2',
					data: 'example'
				}
			}
		}];

		test = {
			test: {
				_id: 'test',
				data: 'test'
			},
			test2: {
				_id: 'test2',
				data: 'example'
			}
		};

		store.dispatch(action.updateReports(test));

		assert.deepEqual(store.getActions(), out, `Didn't dispatch the UPDATE_REPORTS action`);
	});

	it(`should return a clear reports action`, () => {
		out = [{
			type: 'CLEAR_REPORTS'
		}];
		store.dispatch(action.clearReports());
		assert.deepEqual(store.getActions(), out, `Didn't dispatch a CLEAR REPORTS action`);
	});

});
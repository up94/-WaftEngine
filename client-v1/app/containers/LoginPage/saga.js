import { takeLatest, call, select, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';

const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  if (!data.password) errors.password = 'password is required';
  return { errors, isValid: !Object.keys(errors).length };
};

function* loginAction() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const data = { email, password };
  const errors = validate(data);
  if (errors.isValid) {
    yield put(actions.setStoreValue('loading', true));
    yield call(Api.post('user/login', actions.loginSuccess, actions.loginFailure, data));
    yield put(actions.setStoreValue('loading', false));
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(errors.errors) }));
  }
}

// function* loginSuccess(action) {}

function* loginFailure(action) {
  if (action.payload && action.payload.errors && typeof action.payload.errors === 'object') {
    yield put(actions.setStoreValue({ key: 'errors', value: fromJS(action.payload.errors) }));
  } else if (!action.payload) {
    // set global error here
  }
}

export default function* loginPageSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginAction);
  // yield takeLatest(types.LOGIN_SUCCESS, loginSuccess);
  yield takeLatest(types.LOGIN_FAILURE, loginFailure);
}
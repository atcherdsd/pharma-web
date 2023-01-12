import { useEffect, useReducer } from 'react';
import requestSwitch from '../helpers/RequestSwitch';

const initialState = {
  isSuccsessReq: false,
  isError: false,
  reqData: '',
  isFetching: false,
};

const actionKind = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
};

function dataFetchReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actionKind.FETCH_INIT:
      return {
        isSuccsessReq: false,
        isError: false,
        reqData: payload.data,
        isFetching: true,
      };
    case actionKind.FETCH_SUCCESS:
      return {
        isSuccsessReq: true,
        isError: false,
        reqData: payload.data,
        isFetching: false,
      };
    case actionKind.FETCH_FAILURE:
      return {
        isSuccsessReq: false,
        isError: true,
        reqData: payload.data,
        isFetching: false,
      };
    default:
      throw new Error();
  }
}

export default function useFetchReducer(dataForBody, type) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: actionKind.FETCH_INIT,
        payload: {
          data: '',
        },
      });
      const res = await requestSwitch(dataForBody.body, type);
      if (res.success) {
        dispatch({
          type: actionKind.FETCH_SUCCESS,
          payload: {
            data: res.data || res.message,
          },
        });
      } else {
        dispatch({
          type: actionKind.FETCH_FAILURE,
          payload: {
            data: res.message,
          },
        });
      }
    };
    if (dataForBody.content) fetchData();
  }, [dataForBody.content, type]);
  return state;
}

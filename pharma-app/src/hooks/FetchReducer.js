import { useEffect, useReducer } from 'react';

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

export default function useFetchReducer(reqData, type) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: actionKind.FETCH_INIT,
        payload: {
          data: '',
        },
      });
      const res = await fetch(`https://api.github.com/users/${reqData}`);
      if (res.status === 200) {
        //Need for response from server
        // const resData = await res.json();
        dispatch({
          type: actionKind.FETCH_SUCCESS,
          payload: {
            data: switchSuccessRes(type),
          },
        });
      } else {
        dispatch({
          type: actionKind.FETCH_FAILURE,
          payload: {
            data: '',
          },
        });
      }
    };
    if (reqData) fetchData();
  }, [reqData, type]);
  return state;
}

function switchSuccessRes(type) {
  switch (type) {
    case 'restorePassword':
      return 'Restore email successfully sent! Please, check your email.';
    case 'resetPassword':
      return 'Password successfully changed';
  }
}

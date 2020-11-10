import axios from 'axios';
import { Dispatch } from 'redux';

const url = 'https://jsonplaceholder.typicode.com/todos';

export enum ActionTypes {
  FETCH = 'fetch',
}
export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(url);
    dispatch({
      type: ActionTypes.FETCH,
      payload: res.data,
    });
  };
};

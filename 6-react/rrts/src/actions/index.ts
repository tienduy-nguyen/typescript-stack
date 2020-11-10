import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

const url = 'https://jsonplaceholder.typicode.com/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface FetchTodosAction {
  type: ActionTypes.FETCH_TODOS;
  payload: Todo[];
}
export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get<Todo[]>(url);
    dispatch<FetchTodosAction>({
      type: ActionTypes.FETCH_TODOS,
      payload: res.data,
    });
  };
};

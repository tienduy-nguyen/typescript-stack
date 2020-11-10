import React from 'react';
import {connect} from 'react-redux';
import {Todo, fetchTodos} from '../actions';
import {StoreState} from '../reducers';

interface AppProps{
  todos: Todo[],
  fetchTodos(): any;
}

class _App extends React.Component<AppProps>{
  onFetchTodo = ():void =>{
    this.props.fetchTodos();
  }
  renderList(): JSX.Element[]{
    return this.props.todos.map((todo: Todo) =>{
      return <li key={todo.id}>{todo.title}</li>
    });
  }


  render(){
    return(
      <div>
        <button onClick={this.onFetchTodo}>Fetch</button>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({todos}: StoreState): {todos: Todo[]} =>{
  return {todos}
}


export const App = connect(
  mapStateToProps,
  {fetchTodos}
)(_App);
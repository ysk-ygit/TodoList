import { useState, useRef } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] =useState([]);
  const todoNameRef =useRef();
  const handleAddTodo = () => {
    //タスクを追加する。
    const name = todoNameRef.current.value;
    if(name ==="") return;
    setTodos((prevtodos) => {
      return [...prevtodos, { id: uuidv4(), name: name, completed: false}] //オブジェクトにおけるスプレッド構文の追加の方法。既存のタスク(...prevtodosで展開)に新しいタスクをオブジェクトごと追加する
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) =>{
    //チェックの処理を書く。
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id); //タスクを全部参照し、引数のidに合致するものだけtodoに格納
    todo.completed = !todo.completed; //反転させる
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  } 

  return (
    <>
      <article>
      <div class="taskcontainer">
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input id="task-input" type="text" placeholder="タスクを入力して下さい" ref={todoNameRef}/>
        <button id="add-button" onClick={handleAddTodo}>タスクを追加</button>
        <button id = "remove-button" onClick={handleClear}>完了したタスクの削除</button>
      </div>
      <div class="left-task">残りのタスク数: {todos.filter((todo) => !todo.completed).length}つ</div>
      <div class="description">
        <p>・使い方</p>
        <p>タスクを書き込んで、追加ボタンを押すことでTodoリストが追加されます。</p>
        <p>完了したタスクにはチェックを入れましょう。チェックを入れたものは削除することもできます。</p>
        <p>ページを再読み込みするとタスクがリセットされるので、ご注意ください。</p>
      </div>
      </article>
    </>
  );
}

export default App;

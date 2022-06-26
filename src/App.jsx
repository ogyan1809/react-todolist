import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompTodos } from "./components/IncompleteTodos";
import { CompTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // 一つだけ消す
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (text, index) => {
    const newCompleteTodos = [...completeTodos, text];
    setCompleteTodos(newCompleteTodos);
    onClickDelete(index);
  };
  const onClickBackToIncompList = (text, index) => {
    const newTodos = [...incompleteTodos, text];
    setIncompleteTodos(newTodos);
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
  };
  const max_regist_num = 5;
  const max_regist_msg = "登録できるtodoは5個までです。";
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= max_regist_num}
      />
      {incompleteTodos.length >= max_regist_num && (
        <p style={{ color: "red" }}>{max_regist_msg}</p>
      )}
      <IncompTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompTodos todos={completeTodos} onClickBack={onClickBackToIncompList} />
    </>
  );
};

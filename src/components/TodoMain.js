import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import axios from 'axios';

export const TodoMain = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://6501c2ac736d26322f5c3d68.mockapi.io/todo');
        const savedTodos = response.data;
        setTodos(savedTodos);
        console.log(savedTodos);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách công việc:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('https://6501c2ac736d26322f5c3d68.mockapi.io/todo', { task: todo });
      const newTodo = response.data;
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
    } catch (error) {
      console.error('Lỗi khi thêm công việc:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(`https://6501c2ac736d26322f5c3d68.mockapi.io/todo/${id}`);
      const updatedTodo = response.data;
      const newTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.error('Lỗi khi cập nhật công việc:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://6501c2ac736d26322f5c3d68.mockapi.io/todo/${id}`);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error('Lỗi khi xóa công việc:', error);
    }
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  const editTask = async (task, id) => {
    try {
      const response = await axios.put(`https://6501c2ac736d26322f5c3d68.mockapi.io/todo/${id}`, { task });
      const updatedTodo = response.data; 
      const newTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.error('Lỗi khi cập nhật công việc:', error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      ))}
    </div>
  );
};

export default TodoMain

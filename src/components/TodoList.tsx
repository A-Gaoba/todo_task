import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  task: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} index={index} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default TodoList;

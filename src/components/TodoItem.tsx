import React from 'react';

interface Todo {
  task: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
  toggleTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, toggleTodo }) => {
  return (
    <li
      className={`flex items-center p-4 border-b ${
        todo.completed ? 'line-through text-gray-400' : ''
      }`}
    >
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(index)}
          className="mr-4 h-6 w-6 border rounded-full text-green-500 focus:ring-green-400 focus:ring-opacity-25"
          aria-label={`Mark ${todo.task} as ${todo.completed ? 'incomplete' : 'complete'}`}
          title={`Mark ${todo.task} as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="text-xl text-gray-700">{todo.task}</span>
      </label>
    </li>
  );
};

export default TodoItem;

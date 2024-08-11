import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoInputProps {
  addTodo: (task: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [task, setTask] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="What needs to be done?"
        className="flex-1 p-4 text-xl text-gray-500 border-b focus:outline-none focus:ring-0"
      />
    </form>
  );
};

export default TodoInput;

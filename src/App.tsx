import React, { useState } from 'react';
import TodoInput from './components/TodoInpot';
import TodoList from './components/TodoList';

interface Todo {
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (task: string) => {
    setTodos([...todos, { task, completed: false }]);
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center text-red-500 font-light mt-6 sm:mt-8 mb-6 sm:mb-8">
          todos
        </h1>
        <div className="bg-white shadow rounded">
          <TodoInput addTodo={addTodo} />
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
        </div>
        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between p-4 text-gray-500 text-sm">
          <span className="mb-2 sm:mb-0">{todos.filter(todo => !todo.completed).length} items left</span>
          <div className="space-x-2 mb-2 sm:mb-0">
            <button 
              onClick={() => setFilter('all')}
              className={`border rounded px-2 py-1 ${filter === 'all' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`border rounded px-2 py-1 ${filter === 'active' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`border rounded px-2 py-1 ${filter === 'completed' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Completed
            </button>
          </div>
          <button onClick={clearCompleted} className="hover:underline">
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

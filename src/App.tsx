import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

interface Todo {
  task: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = 'todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const loadTodos = () => {
      try {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTodos) {
          const parsedTodos: Todo[] = JSON.parse(storedTodos);
          // Ensure the parsed data is an array of Todo objects
          if (Array.isArray(parsedTodos) && parsedTodos.every(todo => typeof todo.task === 'string' && typeof todo.completed === 'boolean')) {
            setTodos(parsedTodos);
          } else {
            console.error('Invalid todos format in localStorage.');
            // Optionally, clear invalid data
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    };

    loadTodos();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (task: string) => {
    setTodos([...todos, { task, completed: false }]);
  };

  const toggleTodo = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
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

import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const ActiveUser = JSON.parse(localStorage.getItem("ActiveUser"));

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch(`http://localhost:3000/todos/${ActiveUser}`);

        if (!res.ok) throw new Error("Failed to fetch todos");

        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch todos");
      }
    }

    fetchTodos();
  }, [ActiveUser]);

  // change completed
  async function handleCheckboxChange(id) {
    const updatedList = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedList);

    const updatedTodo = updatedList.find((todo) => todo.id === id);

    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });

      if (!res.ok) throw new Error("Failed to update todo");
    } catch (err) {
      console.error(err);
      setError("Could not update todo");
    }
  }

  // Add new todo
  async function addToDo(content) {
    const newItem = {
      content,
      completed: false,
      username: ActiveUser,
    };

    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const createdTodo = await res.json();
      setTodos((prev) => [...prev, createdTodo]);
      setValue("");
    } catch (err) {
      console.error(err);
      setError("Could not add todo");
    }
  }

  // Delete todo
  async function deleteTodo(id) {
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete todo");

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete todo");
    }
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() !== "") {
      addToDo(value);
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {todos.length === 0
          ? "No To Dos Left"
          : todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                {todo.content}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="add">Add To Do</label>
        <input
          id="add"
          type="text"
          value={value}
          placeholder="New to do"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todo;

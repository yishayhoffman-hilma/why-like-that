import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("ActiveUser", JSON.stringify(data));
        setStatus(data.status);
        navigate("/home");
      } else {
        const errorData = await response.json();
        setStatus(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Something went wrong");
    }

    setUsername("");
    setPassword("");
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Username: </label>
        <input
          id="userName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        <br />
        {/* <Link to="../SignUp">Haven't got an account yet? sign up here</Link> */}
      </form>
      {status && <p>{status}</p>}
    </>
  );
}

export default LoginPage;

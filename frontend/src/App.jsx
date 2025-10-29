import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/health")
      .then((res) => res.json())
      .then(setData);
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const user = await res.json();
    setUsers([...users, user]);
    setName("");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Frontend + Backend Connected ✅</h1>
      <p>{data ? JSON.stringify(data) : "Loading..."}</p>

      <form onSubmit={addUser}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        <button type="submit">Add</button>
      </form>

      <ul>{users.map((u) => <li key={u._id}>{u.name}</li>)}</ul>
    </div>
  );
}

export default App;

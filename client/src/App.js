import './App.css';
import Axios from 'axios';
import { useState, useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers')
      .then(res => { setUsers(res.data) })
  }, [users])

  const usersJSX = users.map(user => {
    return (
      <div key={user._id} className="user">
        <h2>{user.name}</h2>
        <p>{user.username} - {user.age}</p>
      </div>
    )
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, username, age }
    await Axios.post('http://localhost:3001/createUser', newUser)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="text" placeholder="age" name="age" value={age} onChange={e => setAge(e.target.value)} />
        <button type="submit">Add User</button>
      </form>
      <div className='users'>
        {usersJSX}
      </div>
    </div>
  );
}

export default App;

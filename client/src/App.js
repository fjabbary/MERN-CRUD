import './App.css';
import Axios from 'axios';
import { useState, useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers')
      .then(res => { setUsers(res.data) })
  }, [users])

  const handleDelete = async id => {
    await Axios.delete(`http://localhost:3001/${id}`)
  }

  const handleUpdateUsername = async id => {
    await Axios.put('http://localhost:3001/update', {
      id: id,
      newUsername: newUsername
    })
  }

  const usersJSX = users.map(user => {
    return (
      <div key={user._id} className="user">
        <h2>{user.name} <button onClick={() => handleDelete(user._id)}>Delete</button></h2>
        <p>{user.username} - {user.age}</p>
        <input type="text" onChange={e => setNewUsername(e.target.value)} />
        <button onClick={handleUpdateUsername.bind(this, user._id)}>Update Username</button>
      </div>
    )
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, username, age }
    await Axios.post('http://localhost:3001/createUser', newUser)
    setName('');
    setUsername('');
    setAge('');
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

import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from 'firebase';

import Todo from './Todo';
import db from './firebase';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodos = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className='App'>
      <h1>
        Todo-App
        <span role='img' aria-label='rocket'>
          🚀 🚀 🚀
        </span>
      </h1>

      <form>
        <FormControl>
          <InputLabel>
            <span role='img' aria-label='writing hand'>
              ✍
            </span>
            Write a todo
          </InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type='submit'
          onClick={addTodos}
          variant='contained'
          color='primary'
        >
          Add todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <div className='unordered'>
            <Todo key={Math.random()} todo={todo} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

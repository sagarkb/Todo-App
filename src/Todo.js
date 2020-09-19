import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Button,
  FormControl,
  Input,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import db from './firebase';

const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 200,
    left: 400,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const deleteTodos = () => {
    db.collection('todos').doc(props.todo.id).delete();
  };

  const updateTodos = () => {
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Update Todos</h1>
          <FormControl>
            <Input
              value={input}
              placeholder={props.todo.todo}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <Button onClick={updateTodos} disabled={!input}>
            Update
          </Button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemText
            primary={props.todo.todo}
            secondary={`Deadline ${Math.floor(Math.random() * 10)} ⏳`}
          />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}> Edit me</Button>
        <DeleteIcon onClick={deleteTodos} />
      </List>
    </React.Fragment>
  );
};

export default Todo;

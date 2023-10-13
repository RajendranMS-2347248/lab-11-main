import { useState } from "react";
import "./App.css";
import DisplayComponents from "./components/DisplayComponents";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";


function validateName(name) {
  if (name.length === 0) {
    return false;
  }
  return true;
}

function App() {
  const [open, setOpen] = useState(false);
  const [tasks_list, setTasksList] = useState([
    {
      id: 0,
      name: "Jogging",
      endTime: new Date()
    },
    {
      id: 1,
      name: "Swimming",
      endTime: new Date(),
    },
  ]);
  const [newTask, setNewTask] = useState({
    id: tasks_list.length,
    name: '',
    endTime: new Date(),
  })

  const [updateTask, setupdateTask] = useState({
    id: null,
    name: '',
    endTime: new Date(),
  })

  const [error, setErrorState] = useState({ error: false, message: '', errorCode: 0 })


  function deleteTask(message) {
    console.log("unshifting");
    const result_tasks = tasks_list.filter((element) =>
      element.name === message ? null : element
    );
    setTasksList(result_tasks);
  }

  console.log("Rerendered");

  const handleClose = () => {
    setOpen(false);
    setNewTask({
      id: null,
      name: '',
      endTime: new Date()
    })
  }

  const handleAdd = () => {
    setTasksList([...tasks_list, newTask])
    setOpen(false);
  }

  const updateComponent = (component) => {
    setupdateTask(component)
  }

  const handleUpdate = () => {
    if (!validateName(updateTask.name)) {
      setErrorState({ error: true, message: 'Invalid Name', errorCode: 1 })
      return;
    }
    setErrorState({ error: false, message: '', errorCode: 0 })
    const temp = []
    tasks_list.forEach((element) => {
      if (element.id === updateTask.id) {
        temp.push(updateTask);
      }
      else temp.push(element);
    });
    setTasksList(temp);
    handleCloseUpdate()
  }

  const handleCloseUpdate = () => {
    setupdateTask({
      id: null,
      name: null,
      endTime: null
    })
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: 5 }}
            value={newTask.name}
            onChange={(e) => setNewTask({ name: e.target.value, endTime: newTask.endTime })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateTimePicker label="Basic date time picker" value={dayjs(newTask.endTime)} onChange={(e) => setNewTask({ name: newTask.name, endTime: e.toDate() })} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateTask.id != null} onClose={handleCloseUpdate}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: 5 }}
            value={updateTask.name}
            onChange={(e) => setupdateTask({ ...updateTask, name: e.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateTimePicker label="Basic date time picker" value={dayjs(updateTask.endTime)} onChange={(e) => setupdateTask({ ...updateTask, endTime: e.toDate() })} />
          </LocalizationProvider>
          <div style={{ color: 'red' }}>
            {(error.errorCode !== 0 && error.errorCode != null) && <p>{error.message}</p>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Fab color="primary" aria-label="add" style={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
      }}
        onClick={() => {
          setNewTask({ id: tasks_list.length + 1, name: '', endTime: new Date() })
          setOpen(true)
        }}>
        <AddIcon />
      </Fab>
      <h1 style={{ textAlign: "center" }}>Task Management System</h1>

      <div
        style={{
          padding: "10px",
          margin: "10px",
          display: "flex",
          gap: "20px",
        }}
      >
        <DisplayComponents
          tasks={tasks_list}
          setTasksList={updateComponent}
          display_a_message={deleteTask}
        />
      </div>
    </>
  );
}

export default App;

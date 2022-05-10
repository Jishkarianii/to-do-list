import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  const [inpValue, setInpValue] = useState("");
  const [toDos, setToDos] = useState(localStorage.getItem("toDos") ? JSON.parse(localStorage.getItem("toDos")) : []);
  const [choosedMode, setChoosedMode] = useState([]);
  const [isAllCompleted, setIsAllToDosCompleted] = useState(false);
  const [isHideClearComplete, setIsHideClearComplete] = useState(false);

  useEffect(() => {
    setChoosedMode(toDos);

    // Count completed toDos
    const completedTodos = toDos.filter(item => {
      return item.check;
    }).length;
    
    // Change "arrow-down" color if all task is completed
    if (completedTodos === toDos.length && toDos.length) {
      setIsAllToDosCompleted(true);
    } else {
      setIsAllToDosCompleted(false);
    }

    // Hide or unhide "Clear completed" button
    if (completedTodos) {
      setIsHideClearComplete(true);
    } else {
      setIsHideClearComplete(false);
    }

    // Save toDos on localStorage
    localStorage.setItem("toDos", JSON.stringify(toDos));

  }, [toDos]);

  const hendleChangeInp = (e) => {
    setInpValue(e.target.value);
  }

  const allToDosSelect = () => {
    // Count completed toDos
    const completedTodos = toDos.filter(item => {
      return item.check;
    }).length;

    let selectedToDos;

    // Check if all todos is completed
    if (completedTodos === toDos.length) {
      selectedToDos = toDos.map(item => {
        return {
          id: item.id,
          check: false,
          task: item.task,
        }
      });
    } else {
      selectedToDos = toDos.map(item => {
        return {
          id: item.id,
          check: true,
          task: item.task,
        }
      });
    }

    setToDos(selectedToDos);
  }

  const countUncompletedToDos = () => {
    const uncompletedToDos = toDos.filter(item => {
      return !item.check;
    }).length;

    return uncompletedToDos;
  }

  const addToDoItem = (e) => {
    e.preventDefault();

    const regex = /^(?!\s*$).+/;
    const checkInp = regex.test(inpValue);

    // Check input if is not empty
    if (checkInp) {
      setToDos([...toDos, {
        id: toDos.length + 1,
        check: false,
        task: inpValue,
      }]);

      setInpValue("");
    }
  }

  const checkedTodoItem = (id) => {
    const checkedTodos = toDos.map(item => {
      if (item.id === id) {
        return {
          id: item.id,
          check: !item.check,
          task: item.task,
        }
      }
      return {
        id: item.id,
        check: item.check,
        task: item.task,
      }
    });

    setToDos(checkedTodos);
  }

  const deleteToDoItem = (id) => {
    const filteredToDos = toDos.filter(item => {
      return item.id !== id;
    });

    setToDos(filteredToDos);
  }

  const editToDoItem = (e, id) => {
    const editedToDos = toDos.map(item => {
      if (item.id === id) {
        return {
          id: item.id,
          check: item.check,
          task: e.target.value,
        }
      }
      return {
        id: item.id,
        check: item.check,
        task: item.task,
      }
    });

    setToDos(editedToDos);
  }

  const checkEditedTask = () => {
    // Check edited Todo item if is not empty
    const checkedToDos = toDos.filter(item => {
      return item.task !== "";
    });

    setToDos(checkedToDos);
  }

  const chooseToDoMode = (mode) => {
    // Sort toDos with user selected mode
    if (mode === "All") {
      setChoosedMode(toDos);
    } else if (mode === "Active") {      
      const activeTodos = toDos.filter(item => {
        return !item.check;
      });
      setChoosedMode(activeTodos);
    } else {
      const completedTodos = toDos.filter(item => {
        return item.check;
      });
      setChoosedMode(completedTodos);
    }
  }

  const removeCompletedTodos = () => {
    const uncompletedToDos = toDos.filter(item => {
      return !item.check;
    });

    setToDos(uncompletedToDos);
  }

  return (
    <div className="App">
      <div className="app-bg"></div>
      <div className="todos">
        <h1>todos</h1>
        <div className="todos-cont">
          <form className="todo-inp" onSubmit={addToDoItem}>
            {toDos.length > 0 && (
              <ExpandMoreIcon 
                className={`arrow-down-icon ${isAllCompleted && "active-arrow"}`} 
                onClick={allToDosSelect}  
              />
            )}
            <input 
              type="text"
              placeholder="What needs to be done?"
              value={inpValue}
              onChange={hendleChangeInp}
            />
          </form>
          {choosedMode.map(toDo => (
            <TodoItem
              key={toDo.id}
              check={toDo.check}
              task={toDo.task}
              checkEvent={() => {
                checkedTodoItem(toDo.id);
              }} 
              deleteEvent={() => {
                deleteToDoItem(toDo.id);
              }} 
              taskEditEvent={(e) => {
                editToDoItem(e, toDo.id);
              }} 
              checkEditedTask={checkEditedTask}
            />
          ))} 
          {toDos.length > 0 && (
            <Footer 
              itemCount={`${countUncompletedToDos()} item left`}
              chooseMode={chooseToDoMode}
              checkCompleted={isHideClearComplete}
              removeCompleted={removeCompletedTodos}
            />  
          )}
        </div>
        <div className="toDo-info">
            <p>Double-click to edit a todo</p>
            <p>Created by Gigi</p>
            <p>Part of <a href="https://todomvc.com/">TodoMVC</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;

// to do MVC: https://todomvc.com/examples/react/#/

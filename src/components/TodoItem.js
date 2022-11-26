import "./TodoItem.css"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef } from "react";

function TodoItem({ check, task, checkEvent, deleteEvent, taskEditEvent, checkEditedTask }) {
    const [editng, setEditing] = useState(false);
    const inputEl = useRef(null);

    // Asynchronous function wait for DOM 
    const startEditTask = async () => {
        await setEditing(true);
        inputEl.current.focus();
    }

    const endEditTask = (e) => {
        e.preventDefault();

        setEditing(false);
        checkEditedTask();
    }

    return (
        <div className="to-do-item" onDoubleClick={startEditTask}>
            <span 
                className={`check-to-do ${check && "checked-to-do"}`}
                onClick={checkEvent}    
            >
                <CheckIcon className="check-icon" />
            </span>
            <div className="to-do-task">
                {editng ? (
                    <form className="edited-text-cont" onSubmit={endEditTask}>
                        <input
                            className="edited-text"
                            type="text"
                            value={task}
                            onChange={taskEditEvent}
                            onBlur={endEditTask}
                            ref={inputEl}
                        />  
                    </form>
                ) : (
                    <div className="text-cont">
                        <div 
                            className={`text ${check && "strike-text"}`}
                        >
                            {task}
                        </div>
                    </div>
                )}
            </div>
            <div 
                className="delet-item-cont"
                onClick={deleteEvent}
            >
                <CloseIcon className="close-icon" />
            </div>
        </div>
    )
}

export default TodoItem

import { useState } from "react"
import "./Footer.css"

function Footer({ itemCount, chooseMode, checkCompleted, removeCompleted }) {
    const [btnMode, setBtnMode] = useState("All");

    const chooseBtnMode = (mode) => {
        setBtnMode(mode);
        chooseMode(mode);
    }

    return (
        <footer>
            <p>{itemCount}</p>
            <div className="btns-cont">
                <button 
                    className={btnMode === "All" ? "active-btn" : null}
                    onClick={() => {
                        chooseBtnMode("All")
                    }}
                >
                    All
                </button>
                <button 
                    className={btnMode === "Active" ? "active-btn" : null}
                    onClick={() => {
                        chooseBtnMode("Active")
                    }}
                >
                    Active
                </button>
                <button 
                    className={btnMode === "Completed" ? "active-btn" : null}
                    onClick={() => {
                        chooseBtnMode("Completed")
                    }}
                >
                    Completed
                </button>
            </div>
            {checkCompleted && (
                <p 
                    className="completed-todos"
                    onClick={removeCompleted}
                >
                    Clear completed
                </p>
            )}
        </footer>
    )
}

export default Footer

import { useState } from "react";

export default function NewTasks({onAdd}){
    const [enteredTask,setEnteredTask]=useState();
    function handleChangeEvent(event){
        setEnteredTask(event.target.value);
    }
    function handleClick(){
        onAdd(enteredTask);
        setEnteredTask('');
    }
    return(
        <div className="flex items-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            onChange={handleChangeEvent}
            value={enteredTask}
            >

            </input>
            <button  className="text-stone-700 hover:text-red-500" onClick={handleClick}>  Add Task

            </button>
        </div>

    );
}
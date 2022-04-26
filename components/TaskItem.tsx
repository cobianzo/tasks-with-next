import React from 'react'
import { TaskType } from '../pages/_app'
import styles from '../styles/TaskItem.module.scss'

import { VscPassFilled, VscPass } from 'react-icons/vsc';
import { BsFillPencilFill } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';

type TaskProps = {
    task: TaskType,
    tasks: TaskType[],
    setTasks: Function,
}

export const TaskItem: React.FunctionComponent<TaskProps> = ( { task, tasksAPI, tasks, setTasks } ) => {

    /** States */
    const [isEditing, setIsEditing] = React.useState<boolean|string>(false);

    /** Refs DOM els */
    const inputRef = React.useRef<HTMLInputElement>(null);


    /** HANDLERS */
    function handleCompletedonClick(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        const newTasks = tasks.map( (theTask) => {
            if (theTask.id === task.id) {
                theTask.completed = !theTask.completed;
            }
            return theTask;
        });
        setTasks(newTasks);
    }

    function handleEditonClick(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        setIsEditing(task.taskText);
    }
    
    function handleSaveChangesAfterEditing(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        const newTasks = tasks.map( (theTask) => {
            if (theTask.taskText === task.taskText) {
                theTask.taskText = isEditing.toString();
            }
            return theTask;
        });
        setTasks(newTasks);
        setIsEditing(false);
    }

    /** watching */
    React.useEffect( () => {
        if (isEditing)
            inputRef?.current?.focus();
    }, [ isEditing ])


    /** RENDER -----------JSX----------- */
    if (!isEditing)
        return (  
            <li className={ styles.task_item +' '+ (task.completed? styles.task_item__completed : styles.task_item__todo )} >
                
                <span className='task-text'>{task.taskText}</span>
                
                <div className="icons">
                    <span onClick={handleEditonClick}><BsFillPencilFill  /></span>
                    <span onClick={e=>tasksAPI.deleteTask(task.id)}><FcCancel  /></span>
                    <span onClick={handleCompletedonClick}>{task.completed? <VscPassFilled  /> : <VscPass />}</span>
                </div>

            </li>);
    else // when editing we show a form instead of a task
        return (
            <li className={styles.task_item}>

                <form className="edit_task_form" onSubmit={handleSaveChangesAfterEditing}>
                    <input ref={inputRef} value={isEditing.toString()} onChange={ e => setIsEditing( e.target.value)  } />
                </form>

            </li>);
}


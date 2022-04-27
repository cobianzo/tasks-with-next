import React from 'react'
import { TaskType } from '../pages/_app'
import styles from '../styles/TaskItem.module.scss'

import { VscPassFilled, VscPass } from 'react-icons/vsc';
import { BsFillPencilFill } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import TasksAPIType from '../pages/_app/TasksAPIType';

type TaskProps = {
    task: TaskType,
    tasks: TaskType[],
    tasksAPI: TasksAPIType,
    setTasks: Function,
}

export const TaskItem: React.FunctionComponent<TaskProps> = ( { task, tasksAPI } ) => {

    /** States */
    const [isEditing, setIsEditing] = React.useState<boolean|string>(false);

    /** Refs DOM els */
    const inputRef = React.useRef<HTMLInputElement>(null);


    /** HANDLERS */
    function handleCompletedonClick(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        tasksAPI.updateTask(task.id, { completed: !task.completed });
    }

    function handleEditonClick(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        setIsEditing(task.taskText);
    }

    function handleDeleteonClick(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        let confirmDeletion = confirm("Are you sure?");
        if (confirmDeletion)
            tasksAPI.deleteTask(task.id);
    }

    function handleSaveChangesAfterEditing(e: React.MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();
        tasksAPI.updateTask(task.id, { taskText: inputRef.current?.value });
        setIsEditing(false);
    }

    /** watching */
    React.useEffect( () => {
        if (isEditing)
            inputRef?.current?.focus();
    }, [ isEditing ])

    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** RENDER -----------JSX------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */
    if (!isEditing)
        return (  
            <li className={ styles.task_item +' '+ (task.completed? styles.task_item__completed : styles.task_item__todo )} >
                
                <span className='task-text' onClick={handleEditonClick} >{task.taskText}</span>
                
                <div className="icons">
                    <span onClick={handleEditonClick}><BsFillPencilFill  /></span>
                    <span onClick={handleDeleteonClick}><FcCancel  /></span>
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
    /** ---------------------------------------------------------------------------------------- */
    /** ---------------------------------------------------------------------------------------- */

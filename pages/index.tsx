import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import {TaskItem} from '../components/TaskItem';
import * as React from 'react';


type Props = {
  tasksAPI: Object,
  tasks: TaskType[],
  setTask: Function,
}

const Home: NextPage<Props> = ( { tasksAPI, tasks, setTasks }) => {

  const [taskEdited, setTaskEdited] = React.useState<string>('');

  // add the edited task as a new task and clean the input
  const handleSubmit = function(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();    
    const numberOfTasks = tasks.length;
    tasksAPI.addNewTask({
      taskText: taskEdited,
      completed: false
    });
    setTaskEdited('');
  } 
  // update taksEdited state as we write the input
  const handleChangeTaskEdited = function(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTaskEdited(e.target.value);    
  }
  return (
    <div className={ styles.container }>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="main">

        <form className={ styles.add_task_form } onSubmit={handleSubmit}>
          <input type="text" value={taskEdited} onChange={handleChangeTaskEdited} placeholder="Add task" />
          <input type="submit" value="+" />
        </form>

        <ul className={ styles.tasks_list }>
          { tasks.map( (task, index) => <TaskItem key={`task-${index}`} 
                                                  task={task} 
                                                  tasksAPI={tasksAPI}
                                                  tasks={tasks} setTasks={setTasks} /> ) }
        </ul>

      </main>
    </div>
  )
}

export default Home

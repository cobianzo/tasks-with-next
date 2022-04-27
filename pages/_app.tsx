import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react';

export interface TaskType {
  id: number,
  taskText: string,
  completed: boolean,
}

export interface TasksAPIType {
  addNewTask: Function,
  deleteTask: Function,
  updateTask: Function,
}

function MyApp({ Component, pageProps }: AppProps) {
  
  const [tasks, setTasks] = React.useState<TaskType[]>([]);

  /** API to access to tasks */
  const tasksAPI = {  
    addNewTask: function( task: TaskType ):void {
      if (task.taskText?.trim() === '') {
        return;
      }
      // get latest id from tasks
      if (tasks.length)
        task.id = tasks.reduce( (acc, curr) =>  curr.id > acc? curr.id : acc  , 0 ) + 1;
      else task.id = 1;
      setTasks( [...tasks, task]  );
    },

    deleteTask : function( taskId: number ):void {
      const taskExists = tasks.findIndex( tt => tt.id === taskId );
      if (taskExists >= 0 ) {
        const newTasks = tasks.filter( (theTask, index) => index !== taskExists );
        setTasks(newTasks);
      }
    },

    updateTask : function( taskId: number, taskFields: Object ):void {
      const taskExists = tasks.findIndex( tt => tt.id === taskId );
      if (taskExists >= 0 ) {
        const newTasks = tasks.map( (theTask, index) => {
          if (index === taskExists) {
            theTask = { ...theTask, ...taskFields };
          }
          return theTask;
        } );
        setTasks(newTasks);
      }
    }
  }


  return <Component {...pageProps} 
            tasksAPI={tasksAPI}
            tasks={tasks}
            setTasks={setTasks}
            />
}

export default MyApp

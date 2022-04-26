import { TaskType } from '../pages/_app'

function addNewTask( task: TaskType ):void {
    if (task.taskText?.trim() === '') {
      return;
    }
    // get latest id from tasks
    if (tasks.length)
      task.id = tasks.reduce( (acc, curr) => { curr > acc? curr : acc  } ) + 1;
    else task.id = 1;
    setTasks( [...tasks, task]  );
  }
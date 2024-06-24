// we will be creating a task/todo manager
// we will be storing our tasks in json format in a file

const path  = require('path');
const fs = require('fs');
const readline = require('readline');

const tasksFilePath = path.join(__dirname, "task.json");

// Ensure the file exists
if(!fs.existsSync(tasksFilePath)) {
  console.log("File does not exist, creating it now")
  fs.writeFileSync(tasksFilePath, '[]');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getMyTasks = () => {
  const tasks = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(tasks);
}

const saveMyTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks));
}

const addTask = (task) => {
  const tasks = getMyTasks(); // [{}, {}]
  tasks.push({ description: task, completed: false });
  saveMyTasks(tasks);
  console.info("Task added successfully");
}

// listing
const listTasks = () => {
  const tasks = getMyTasks(); 
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.description} - [${task.completed ? "x" : " "}]`)
  }) 
}

// complete a task
const completeTask = (taskNo) => {
  const tasks = getMyTasks(); // Array<{description: string, completed: boolean}>
  if(tasks[taskNo - 1]) {
    tasks[taskNo - 1].completed = true;
    saveMyTasks(tasks);
    console.info("Task completed successfully");
  } else {
    console.warn("Invalid task number");
  }
  return;
}

// deleting
const deleteTask = (taskNo) => {
  const tasks = getMyTasks();
  if(tasks[taskNo - 1]) {
    const filteredTask = tasks.filter((task, index) => index !== taskNo - 1);
    saveMyTasks(filteredTask);
    console.info("Task deleted successfully");
  } else {
    console.warn("Invalid task number");
  }
  return;

}

// add task to txt file
const moveTasksToTxt = () => {
  const getTasks = getMyTasks();
  fs.writeFileSync(path.join(__dirname, "tasks.txt"), '');
  getTasks.forEach((task, i) => {
    fs.appendFileSync(path.join(__dirname, "tasks.txt"), `${i+1}. ${task.description} - [${task.completed ? "x" : " "}] \n`);
  })
}

function todoManager() {
  rl.question(`What would you like to do?
  1. Add a task
  2. List all tasks
  3. Mark task as completed
  4. Delete Task
  5. Exit
  `, (answer) => {
    switch(answer) {
      case "1":
        rl.question("Enter your task: ", (task) => {
          addTask(task);
          todoManager();
        })
        break;
      case "2":
        listTasks();
        todoManager();
        break;
      case "3":
        rl.question("Enter the task number you want to complete: ", (taskNo) => {
          completeTask(+taskNo); // string number into number
          todoManager();
        });
        break
      case "4":
        rl.question("Enter the task number you want to delete: ", (taskNo) => {
          deleteTask(+taskNo);
          todoManager();
        });
        break;
      case "5":
        moveTasksToTxt();
        rl.close();
        break;
      default:
        console.log("Invalid option");
        todoManager();
    }
  })
}

todoManager();
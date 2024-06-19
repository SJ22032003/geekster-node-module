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
  const tasks = getMyTasks();
  tasks.push({ description: task, completed: false });
  saveMyTasks(tasks);
  console.info("Task added successfully");
}

// listing
// updating
// deleting

function todoManager() {
  rl.question("What would you like to do?\n1. Add a task\n", (answer) => {
    switch(answer) {
      case "1":
        rl.question("Enter your task: ", (task) => {
          console.log(`Adding task: ${task}`);
          addTask(task);
          todoManager();
        })
        break;
      default:
        console.log("Invalid option");
        todoManager();
    }
  })
}

todoManager();
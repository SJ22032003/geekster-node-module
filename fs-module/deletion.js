const fs = require('fs');

// rmDir function

// synchronous version
fs.rmdirSync('deleteThisFolder');

// asynchronous version
// fs.rmdir('deleteThisFolder', (err) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log("Folder deleted successfully!")
//   }
// });


console.log("Folder deleted successfully! 2")
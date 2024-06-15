const cpr = require('cpr').cpr;
const fs = require('fs');
const path = require('path');

// Define the source and destination directories
const sourceDir = path.join(__dirname);
const destDir = path.join(__dirname, 'build');

// Function to copy files
const copyFiles = (source, dest) => {
  cpr(source, dest, {
    deleteFirst: true,
    overwrite: true,
    confirm: true
  }, function(err, files) {
    if (err) {
      console.error(err);
    } else {
      console.log('Files copied:', files.length);
    }
  });
};

// Check if the build directory exists
if (fs.existsSync(destDir)) {
  // Remove the build directory
  fs.rmdir(destDir, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Removed existing build directory');
      // Copy files after removing the directory
      copyFiles(sourceDir, destDir);
    }
  });
} else {
  // Copy files if the build directory does not exist
  copyFiles(sourceDir, destDir);
}

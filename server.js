const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post('/runcode', (req, res) => {
  const { filename } = req.body;

  const pythonProcess = spawn('python', [filename]); // Replace 'python' with 'python3' if needed

  pythonProcess.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', code => {
    if (code === 0) {
      res.status(200).send('Python file executed successfully!');
    } else {
      res.status(500).send(`Error executing Python file. Exit code: ${code}`);
    }
  });
});

const PORT = 3000; // Choose a port number
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

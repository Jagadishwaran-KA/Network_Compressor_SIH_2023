const express = require('express');
const app = express();
const port = 8080;

// Serve files from the specified directory
app.use('/share.txt', express.static('/home/vboxuser/Desktop/server1/share.txt'));

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});


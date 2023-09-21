const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 8080;

// Define a route to initiate file transfer
app.get('/Net_Hunters', async (req, res) => {
  try {
    // Make an HTTP GET request to VM 1's Express server to download a file
    const response = await axios.get('http://10.0.2.15:8080/share.txt', {
      responseType: 'stream', // Stream the file response
    });

    // Create a write stream to save the file to a specific directory on VM2
    const filePath = '/home/vboxuser/Desktop/server1/share.txt';
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the received data stream to the write stream
    response.data.pipe(writeStream);

    // Wait for the file to finish writing
    writeStream.on('finish', () => {
      console.log('File saved successfully.');
      res.send('Transferred Successfully!');
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('File transfer and save failed');
  }
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});


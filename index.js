const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT
const compress = "output.lz4"


//SYNC COMPRESSION/
const fs = require('fs')
const lz4 = require('lz4')
const input = fs.readFileSync('test.txt')
const output = lz4.encode(input)

fs.writeFileSync(compress, output)


//Pre Controllers
const crypto = require('crypto');
const inputFile = compress;
const outputFile = 'encrypted.txt';
const algorithm = 'aes-256-cbc';
const password = 'akdpdopoefjfwpn';


const salt = crypto.randomBytes(16);

const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
const iv = crypto.randomBytes(16);

// Synchronous encryption
const input_encrypt = fs.readFileSync(inputFile);
const cipher = crypto.createCipheriv(algorithm, key, iv);
const encryptedBuffer = Buffer.concat([cipher.update(input_encrypt), cipher.final()]);
fs.writeFileSync(outputFile, Buffer.concat([salt, iv, encryptedBuffer]));

console.log(`File encrypted and saved as ${outputFile}`);


//HOME ROUTE
app.get("/", (req, res) => {
    res.send("Network Compression");
})



app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
})






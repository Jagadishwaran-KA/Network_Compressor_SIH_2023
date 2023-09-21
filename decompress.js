const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT
const fs = require('fs')
const lz4 = require('lz4')

//DECRYPTION
const crypto = require('crypto');
const outputFile = 'encrypted.txt';
const algorithm = 'aes-256-cbc';
const password = 'akdpdopoefjfwpn';


const encryptedDataWithSaltAndIV = fs.readFileSync(outputFile);
const saltFromEncryptedData = encryptedDataWithSaltAndIV.slice(0, 16);
const ivFromEncryptedData = encryptedDataWithSaltAndIV.slice(16, 32);
const encryptedInput = encryptedDataWithSaltAndIV.slice(32);


const keyForDecryption = crypto.pbkdf2Sync(password, saltFromEncryptedData, 100000, 32, 'sha512');
const decipher = crypto.createDecipheriv(algorithm, keyForDecryption, ivFromEncryptedData);
const decryptedBuffer = Buffer.concat([decipher.update(encryptedInput), decipher.final()]);
const decryptionOutputFile = "decompress.lz4";

fs.writeFileSync(decryptionOutputFile, decryptedBuffer);

console.log('File decrypted successfully.');

//DECOMPRESSION 
const input = fs.readFileSync(decryptionOutputFile)
const output = lz4.decode(input)
fs.writeFileSync('decrypted.txt', output)

console.log("File Decompressed and saved as decompress.txt");





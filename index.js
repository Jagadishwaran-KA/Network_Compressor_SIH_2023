const express = require('express');
const upload = require('express-fileupload')
const app = express()
app.use(upload())
app.get('/compress', (req, res) => { 
    res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/decompress', (req, res) => { 
    res.sendFile( __dirname + "/" + "index.html" );
})
app.post('/compress', (req, res) =>{ 
    if (req.files){
        console.log(req.files) 
    var file = req.files.file
    var filename= file.name
    console.log(filename)
    file.mv('./uploads_compress/'+filename, function(err) {
      if (err) {
       res.send(err)
      } 
      else {
       res.send("File uploaded")
      }
});
}
});
app.post('/decompress', (req, res) =>{ 
    if (req.files){
        console.log(req.files) 
    var file = req.files.file
    var filename= file.name
    console.log(filename)
    file.mv('./uploads_decompress/'+filename, function(err) {
      if (err) {
       res.send(err)
      } 
      else {
       res.send("File uploaded")
      }
});
}
});
app.listen(5000);

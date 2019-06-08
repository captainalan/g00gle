const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Add a line to the log
app.post('/api/add/:line', (req, res) => {
    let my_line = req.params.line + '\n'; // Line to append
    fs.appendFile('search_log.txt'
                  , my_line
                  , (err) => {
                      if (err) throw err;
                      res.send(`"${my_line.trim()}" added to log.`);
                  });
});

// View the log
app.get('/api/log', (req, res) => {
    let my_path = path.join(__dirname, 'search_log.txt');
    fs.access(my_path, (err) => {
        if (err) {
            res.send("Something went wrong, err");
        } else {
            res.sendFile(my_path);
        }
    });
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

// const express = require('express');
// const app = express();

// app.use(express.static('./package.json'));

// app.get('/*', function(req, res) {
//     res.sendFile('index.html', {root: './src/'});});

// app.listen(process.env.PORT || 8080);

//Install express server
const express = require('express');


const app = express();

// app.use(express.static('./package.json'));

// Serve only the static files form the dist directory
app.use(express.static('./dist/smart-farming-malaysia'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/smart-farming-malaysia/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
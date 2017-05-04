const Express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = new Express();

const DIST_PATH = path.join(__dirname, '../www');

app.set('port', process.env.PORT || 8080);
app.engine('.html', ejs.renderFile);
app.set('views', DIST_PATH);
app.set('view engine', 'ejs');

app.locals.year = (new Date()).getFullYear();
app.locals.env = {
  CABINET_URL: process.env.CABINET_URL || 'https://apps.gndf.io'
};

app.get('/', (req, res) => {
  return res.render('index.html');
});
app.get('/index.html', (req, res) => {
  return res.render('index.html');
});
app.get('/decision-engine.html', (req, res) => {
  return res.render('decision-engine.html');
});
app.get('/scoring-engine.html', (req, res) => {
  return res.render('scoring-engine.html');
});


app.use('/', Express.static(DIST_PATH));

app.get('*', (req, res) => {
  return res.render('index.html');
});


app.listen(app.get('port'), (err) => {
  if (err) {
    /* eslint-disable no-console */
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost: ${app.get('port')}`);
});

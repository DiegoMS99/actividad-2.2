const { app } = require('./index');

app.listen(app.get('servidor-puerto'), function () {
  console.log('Servidor en línea, puerto', app.get('servidor-puerto'));
});

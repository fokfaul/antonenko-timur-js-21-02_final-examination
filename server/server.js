const {app, host, port} = require('./src/app')

app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))
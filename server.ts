import app from './src/app.js'
import config from './src/config/setting.config.js'

const { port } = config.app

const server = app.listen(port, () => {
  console.log(`Application is running on port ${port}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log(`exits server express`))
})

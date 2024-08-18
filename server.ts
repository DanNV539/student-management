import app from './src/app.js'
import config from './src/config/setting.config.js'

const { port } = config.app

app.listen(port, () => {
  console.log(`Application is running on port ${port}`)
})

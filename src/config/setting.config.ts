type TConfig = {
  app: {
    port?: string
  }
  db: {
    port?: string
    host?: string
    name?: string
  }
  mongodb: {
    uri?: string
  }
}

const dev: TConfig = {
  app: {
    port: process.env.DEV_APP_PORT
  },
  db: {
    port: process.env.DEV_DB_PORT,
    host: process.env.DEV_DB_HOST,
    name: process.env.DEV_DB_NAME
  },
  mongodb: {
    uri: `mongodb+srv://nguyenvandan0503:${process.env.DEV_MONGODB_PASSWORD}@studentmanagement.hwual.mongodb.net/?retryWrites=true&w=majority&appName=studentManagement`
  }
}

const pro: TConfig = {
  app: {
    port: process.env.PRO_APP_PORT
  },
  db: {
    port: process.env.PRO_DB_PORT,
    host: process.env.PRO_DB_HOST,
    name: process.env.PRO_DB_NAME
  },
  mongodb: {
    uri: `mongodb+srv://nguyenvandan0503:${process.env.PRO_MONGODB_PASSWORD}@studentmanagement.hwual.mongodb.net/?retryWrites=true&w=majority&appName=studentManagement`
  }
}

const config = { dev, pro }

type Tenv = keyof typeof config

const env: Tenv = (process.env.NODE_ENV as Tenv) || 'dev'

export default config[env]

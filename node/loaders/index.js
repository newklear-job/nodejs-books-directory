import expressLoader from './express'
import mongooseLoader from './mongoose'
import routesLoader from './routes'

export default async ({ expressApp }) => {
  await mongooseLoader()
  console.log('MongoDB Initialized')
  await expressLoader({ app: expressApp })
  console.log('Express Initialized')
  routesLoader(expressApp)
  console.log('Routes Initialized')
}

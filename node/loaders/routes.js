import routes from '~/routes'
import cors from 'cors'
export default (expressApp) => {
  expressApp.use(cors())
  routes(expressApp)
}

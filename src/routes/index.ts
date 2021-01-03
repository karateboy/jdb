import * as express from 'express'
import * as http from 'http'
import * as passportConfig from '../config/middleware/passport'
import * as swaggerUi from 'swagger-ui-express'
import AuthRouter from './AuthRouter'
import UserRouter from './UserRouter'
import CustomerRouter from './CustomerRouter'
import CodeRouter from './CodeRouter'
import MaterialRouter from './MaterialRouter'
import InventoryRouter from './InventoryRouter'
import OrderRouter from './OrderRouter'
import ProductRouter from './ProductRouter'
import WorkRouter from './WorkRouter'

let swaggerDoc: Object

try {
    swaggerDoc = require('../../swagger.json')
} catch (error) {
    console.log('***************************************************')
    console.log('  Seems like you doesn`t have swagger.json file')
    console.log('  Please, run: ')
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json')
    console.log('***************************************************')
}

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router()
    app.use('/v1/users', passportConfig.isAuthenticated, UserRouter)
    app.use('/v1/customers', passportConfig.isAuthenticated, CustomerRouter)
    app.use('/v1/inventories', passportConfig.isAuthenticated, InventoryRouter)
    app.use('/v1/codes', passportConfig.isAuthenticated, CodeRouter)
    app.use('/v1/materials', passportConfig.isAuthenticated, MaterialRouter)
    app.use('/v1/orders', passportConfig.isAuthenticated, OrderRouter)
    app.use('/v1/products', passportConfig.isAuthenticated, ProductRouter)
    app.use('/v1/works', passportConfig.isAuthenticated, WorkRouter)

    app.use('/auth', AuthRouter)

    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve)
        app.get('/docs', swaggerUi.setup(swaggerDoc))
    } else {
        app.get('/docs', (req, res) => {
            res.send(
                "<p>Seems like you doesn't have <code>swagger.json</code> file.</p>" +
                '<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>' +
                '<p>Then, restart your application</p>'
            )
        })
    }

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404])
    })

    /**
     * @constructs all routes
     */
    app.use(router)
}

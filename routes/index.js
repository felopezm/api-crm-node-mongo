const express = require('express');
const router = express.Router();
const clientsController =  require('../controllers/clientsController');
const productsController =  require('../controllers/productsController');
const ordersController =  require('../controllers/ordersController');
const usersController =  require('../controllers/usersController');

module.exports = () => {

    // middle for segurity routes
    const auth = require('../middleware/auth');

    /** index */
    router.get('/', (req,res) =>{
        res.send('Hello World');
    });

    /** clients */
    router.post('/clients', clientsController.newClient);
    router.get('/clients', auth, clientsController.viewClients);
    router.get('/clients/:id', auth, clientsController.viewClient);
    router.put('/clients/:id', auth, clientsController.updateClient);
    router.delete('/clients/:id', auth, clientsController.deleteClient);

    /** products */
    router.post('/products',       
        productsController.uploadfile,
        productsController.newProduct
    );
    router.get('/products', auth, productsController.viewProducts);
    router.get('/products/:id', auth, productsController.viewProduct);
    router.put('/products/:id', auth,
        productsController.uploadfile,
        productsController.updateProduct
    );
    router.delete('/products/:id', auth, productsController.deleteProduct);
    router.post('/products/search/:query', productsController.searchProduct);

    /** orders */
    router.post('/orders', ordersController.newOrder);
    router.get('/orders', auth, ordersController.viewOrders);
    router.get('/orders/:id', auth, ordersController.viewOrder);
    router.put('/orders/:id', auth, ordersController.updateOrder);
    router.delete('/orders/:id', auth, ordersController.deleteOrder);

    /** users */
    router.post('/new-acount', auth, usersController.newUser);
    router.post('/login', usersController.autenticateUser);

    return router;
}
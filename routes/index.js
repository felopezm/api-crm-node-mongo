const express = require('express');
const router = express.Router();
const clientsController =  require('../controllers/clientsController');
const productsController =  require('../controllers/productsController');
const ordersController =  require('../controllers/ordersController');

module.exports = function () {
    /** index */
    router.get('/', (req,res) =>{
        res.send('init');
    });

    /** clients */
    router.post('/clients', clientsController.newClient);
    router.get('/clients', clientsController.viewClients);
    router.get('/clients/:id', clientsController.viewClient);
    router.put('/clients/:id', clientsController.updateClient);
    router.delete('/clients/:id', clientsController.deleteClient);

    /** products */
    router.post('/products',        
        productsController.uploadfile,
        productsController.newProduct
    );
    router.get('/products', productsController.viewProducts);
    router.get('/products/:id', productsController.viewProduct);
    router.put('/products/:id',
        productsController.uploadfile,
        productsController.updateProduct
    );
    router.delete('/products/:id', productsController.deleteProduct);
    router.post('/products/search/:query', productsController.searchProduct);

    /** orders */
    router.post('/orders', ordersController.newOrder);
    router.get('/orders', ordersController.viewOrders);
    router.get('/orders/:id', ordersController.viewOrder);
    router.put('/orders/:id', ordersController.updateOrder);
    router.delete('/orders/:id', ordersController.deleteOrder);

    return router;
}
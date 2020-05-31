const Orders = require('../models/Orders');

exports.newOrder = async (req, res, next) => {
    const order = new Orders(req.body);
    try {
        await order.save();
        res.json({ message: 'Added new order!' });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.viewOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find({}).populate('client').populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.viewOrder = async (req, res, next) => {
    // order by id
    const order = await Orders.findById(req.params.id).populate('client').populate({
        path: 'products.product',
        model: 'Products'
    });

    if (!order) {
        res.json({ message: 'Orders not found !' });
        return next();
    }

    res.json(order);
}

exports.updateOrder = async (req, res, next) => {
    try {
        let order = await Orders.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        }).populate('client').populate({
            path: 'products.product',
            model: 'Products'
        });

        res.json(order);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        await Orders.findOneAndDelete({ _id: req.params.id });
        res.json({message:'Order deleted...'});
    } catch (error) {
        console.log(error);
        next();
    }
}
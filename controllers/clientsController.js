const Clients = require('../models/Clients');

exports.newClient = async (req, res, next) => {
    const client = new Clients(req.body);

    try {
        await client.save();
        res.json({ message: 'New cliente added !' });
    } catch (error) {
        console.log(error);
        return next();
    }

}

exports.viewClients = async (req, res, next) => {

    try {
        const clients = await Clients.find({});
        res.json(clients);
    } catch (error) {
        console.log(error);
        return next();
    }

}

exports.viewClient = async (req, res, next) => {
    // client by id
    const client = await Clients.findById(req.params.id);
    if (!client) {
        res.json({ message: 'Client not found !' });
        return next();
    }

    res.json(client);
}

exports.updateClient = async (req, res, next) => {
    try {
        const client = await Clients.findOneAndUpdate({ _id: req.params.id },
            req.body, {
            new: true
        });

        res.json(client);
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.deleteClient = async (req, res, next) => {
    try {
        await Clients.findOneAndDelete({ _id: req.params.id });
        res.json({message:'Cliente deleted...'});
    } catch (error) {
        console.log(error);
        return next();
    }
}
const Products = require('../models/Products');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Format Not valid'))
        }
    },
}

// config file
const upload = multer(configuracionMulter).single('image');

// upload imagen
exports.uploadfile = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

exports.newProduct = async (req,res,next) =>{
    const product = new Products(req.body);
    try {
        if (req.file.filename) {
            product.image = req.file.filename;
        }
        await product.save();
        res.json({message: 'Added new product !'});
    } catch (error) {
        console.log(error);
        return next();        
    }
}

exports.viewProducts = async (req,res,next) =>{
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        return next();        
    }
}

exports.viewProduct = async (req, res, next) => {
    // Product by id
    const product = await Products.findById(req.params.id);
    if (!product) {
        res.json({ message: 'Product not found !' });
        return next();
    }

    res.json(product);
}

exports.updateProduct = async (req, res, next) => {
    try {
        let newProduct = req.body;
        // validate image
        if (req.file) 
            newProduct.image = req.file.filename;
        else{
            let productOld = await Products.findById(req.params.id);
            newProduct.image = productOld.image;
        }

        let product = await Products.findOneAndUpdate({ _id: req.params.id },
            newProduct, {
            new: true
        });

        res.json(product);
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        await Products.findOneAndDelete({ _id: req.params.id });
        res.json({message:'Product deleted...'});
    } catch (error) {
        console.log(error);
        return next();
    }
}
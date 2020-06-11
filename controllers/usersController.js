const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.newUser = async (req, res) => {
    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);

    try {
        await user.save();
        res.json({ message: 'User created with success !' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error internal server !' });
    }

}

exports.autenticateUser = async (req, res, next) => {
    const { email,password } = req.body;
    const user = await Users.findOne({ email });

    if(!user){
        await res.status(401).json({message:'User not found !'});
        next();
    }else{

        if(!bcrypt.compareSync(password, user.password)){
            await res.status(401).json({message:'Password diferent!'});
            next();
        }else{
            // firm token
            const token = jwt.sign({
                email: user.email,
                full_name: user.full_name,
                id: user._id
            }, 
            'api_key',
            {
                expiresIn:'2h'
            });

            await res.status(200).json({token});
        }
        
    }
}
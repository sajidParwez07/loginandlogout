const UserSchema = require('../models/userModels.js');


const SaveUSer = async (req, res) => {
    const user = new UserSchema(req.body);
    try {
        const insertdata = await user.save();
        res.status(201).json(insertdata);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserSchema.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        else {
            const token = await user.generateAuthToken();
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true    
            });
            res.cookie('userData', user._id, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true
            });
            res.status(200).json({ message: 'user login successfully...!!!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const GetUserById = async (req, res) => {
    try {
        const userdata = await UserSchema.findById(req.params.id);
        res.status(200).json(userdata);
    } catch (error) {
        res.status(400).json('User Not Found');

    }
};
module.exports = { SaveUSer, Login, GetUserById };
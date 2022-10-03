const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'});
}

const signUpUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.signup(name, email, password);

        return res
                  .status(200)
                  .json({
                    status: 'success',
                    data: {
                        email: user.email,
                        token: createToken(user._id)
                    }
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    status: 'fail',
                    message: err.message
                  })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        return res
                  .status(200)
                  .json({
                    status: 'success',
                    data: {
                        name: user.name,
                        email: user.email,
                        token: createToken(user._id)
                    }
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    status: 'fail',
                    message: err.message
                  })
    }
}

module.exports = {signUpUser,loginUser}
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
const { JWT } = require("../libs/jwtSecurity");

const authenticate = async (req, res, next) => {
    
    const authHeader = req.get("Authorization");
    
    let token = "";

    if(authHeader && authHeader.startsWith("Bearer")) {
        
        token = authHeader.split(" ")[1];

    } else {

        return res.status(401).send({
            status: false,
            message: "You must log in to access this resource!",
            data: null,
        });

    }

    try {

        const decoded = jwt.verify(token, JWT.SECRET);
        const tokenExists = await authRepository.getTokenByUsername({username: decoded.username});

        if (!tokenExists || tokenExists.admin_token?.token !== token) {
            return res.status(401).send({
                status: false,
                message: "Invalid or expired token!",
                data: null,
            });
        }

        req.admin = decoded;

        next();

    } catch(err) {

        return res.status(401).send({
            status: false,
            message:"Your session has expired, please log in again!",
            data: null,
        });

    } 

};

module.exports = { authenticate };
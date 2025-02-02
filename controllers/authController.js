const authService = require("../services/authService");

/* ------------------- Admin Login ------------------- */

const handleAdminLogin = async(req, res) => {

    const { username, password, id_admin, expired_at } = req.body;

    const { status, status_code, message, data} = await authService.handleAdminLogin({
        username,
        password,
        id_admin,
        expired_at
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Admin Login ------------------- */

module.exports = { handleAdminLogin }
const db = require('../models/index');
const { Admin, AdminToken } = db;

class AuthRepository {

    /* ------------------- Handle Get Data By Username ------------------- */

    static async handleGetDataByUsername({ username }) {
        
        const getDataByUsername = await Admin.findOne({
            where: { username }
        });

        return getDataByUsername;

    };

    /* ------------------- End Handle Get Data By Username ------------------- */


    /* ------------------- Handle Get Token By Admin Id ------------------- */

    static async getTokenByAdminId({ id_admin }) {
        
        const getToken = await AdminToken.findOne({
            where: { id_admin },
        });

        return getToken;

    };

    /* ------------------- End Handle Get Token By Admin Id ------------------- */


    /* ------------------- Handle Get Token By Username ------------------- */

    static async getTokenByUsername({ username }) {
        
        const getToken = await Admin.findOne({
            where: { username },
            include: [
                {
                    model: AdminToken,
                    as: 'admin_token',
                    attributes: ['token'],
                },
            ],
        });

        return getToken;

    };

    /* ------------------- End Handle Get Token By Username ------------------- */


    /* ------------------- Handle Create Token ------------------- */

    static async handleCreateToken({ id_admin, token, expired_at }) {

        const createData = await AdminToken.create({
            id_admin,
            token,
            expired_at
        });

        return createData;

    };

    /* ------------------- End Handle Create Token ------------------- */

    
    /* ------------------- Handle Update Token ------------------- */

    static async handleUpdateToken({ id_admin, token, expired_at }) {

        const updateData = await AdminToken.update({
            id_admin,
            token,
            expired_at
        }, {
            where: { id_admin }
        });

        return updateData;

    };

    /* ------------------- End Handle Update Token ------------------- */

};

module.exports = AuthRepository;
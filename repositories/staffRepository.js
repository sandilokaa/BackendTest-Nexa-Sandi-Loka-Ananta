const Karyawan = require("../models/staff");
const { Op } = require("sequelize");

class StaffRepository {

    /* ------------------- Handle Get Data By Last Staff ------------------- */

    static async handleGetLastStaff({ year }) {

        const lastStaff = await Karyawan.findOne({
            where: {
                nip: {
                    [require('sequelize').Op.like]: `${year}%`,
                },
            },
            order: [['nip', 'DESC']],
        });

        return lastStaff;
    };

    /* ------------------- End Handle Get Data By Last Staff ------------------- */


    /* ------------------- Handle Get Data By NIP ------------------- */

    static async handleGetStaffByNIP({ nip }) {

        const getStaff = await Karyawan.findOne({
            where: { nip },
        });

        return getStaff;
    };

    /* ------------------- End Handle Get Data By NIP ------------------- */


    /* ------------------- Create New Staff ------------------- */

    static async handleCreateNewStaff({
        nip,
        nama,
        alamat,
        gend,
        photo,
        tgl_lahir,
        id,
        insert_by,
        update_by
    }) {

        const staffCreate = await Karyawan.create({
            nip,
            nama,
            alamat,
            gend,
            photo,
            tgl_lahir,
            id,
            insert_by,
            update_by
        });

        return staffCreate;

    };

    /* ------------------- End Create New Staff ------------------- */


    /* ------------------- Handle Get All Staff ------------------- */

    static async handleGetAllStaff({ nama, start = 1, count = 10 }) {
        start = parseInt(start, 10);
        count = parseInt(count, 10);

        if (isNaN(start) || start < 1) start = 1;
        if (isNaN(count) || count < 1) count = 10;
    
        const whereCondition = {};
        if (nama) {
            whereCondition.nama = { [Op.like]: `%${nama}%` };
        }
    
        const { count: totalItems, rows: staffData } = await Karyawan.findAndCountAll({
            where: whereCondition,
            limit: count,
            offset: (start - 1) * count,
        });
    
        return {
            meta: {
                totalItems,
                totalPages: Math.ceil(totalItems / count),
                currentPage: start,
                hasNextPage: start < Math.ceil(totalItems / count),
                hasPreviousPage: start > 1
            },
            staffData
        };
    };

    /* ------------------- End Handle Get All Staff ------------------- */


    /* ------------------- Update Staff Data ------------------- */

    static async handleUpdateStaff({
        nip,
        nama,
        alamat,
        gend,
        photo,
        tgl_lahir,
        insert_by,
        update_by
    }) {

        const updateStaff = await Karyawan.update({
            nip,
            nama,
            alamat,
            gend,
            photo,
            tgl_lahir,
            insert_by,
            update_by
        }, {
            where: { nip }
        });

        return updateStaff;
    };

    /* ------------------- End Update Staff Data ------------------- */


    /* ------------------- Deactivate Staff ------------------- */

    static async handleDeactivateStaff({ nip, status }) {
        const deactiveStaff = await Karyawan.update({
            status,
        }, {
            where: { nip }
        });

        return deactiveStaff;
    };

    /* ------------------- End Deactivate Staff ------------------- */

};

module.exports = StaffRepository;
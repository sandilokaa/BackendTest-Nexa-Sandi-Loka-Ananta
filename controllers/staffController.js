const staffService = require("../services/staffService");
const { generateNIP } = require("../utils/generateNIP");

/* ------------------- Create New Staff ------------------- */

const handleCreateNewStaff = async(req, res) => {

    const nip = await generateNIP();

    const insert_by = req.admin.username;
    const update_by = req.admin.username;

    let photoFile = "";

    if (req.file) {
        photoFile = req.file.base64;
    }

    const { 
        nama,
        alamat,
        gend,
        tgl_lahir,
        id
    } = req.body;

    const { status_api, status_code, message, data} = await staffService.handleCreateNewStaff({
        nip,
        nama,
        alamat,
        gend,
        photo: photoFile,
        tgl_lahir,
        id,
        insert_by,
        update_by
    });

    res.status(status_code).send({
        status: status_api,
        message: message,
        data: data,
    });

};

/* ------------------- End Create New Staff ------------------- */


/* ------------------- Handle Get All Staff ------------------- */

const handleGetAllStaff = async(req, res) => {

    const { nama, start, count } = req.query;

    const { status_api, status_code, message, data} = await staffService.handleGetAllStaff({ nama, start, count });

    res.status(status_code).send({
        status: status_api,
        message: message,
        data: data,
    }); 
};

/* ------------------- End Handle Get All Staff ------------------- */


/* ------------------- Update Staff Data ------------------- */

const handleUpdateStaff = async(req, res) => {

    const { nip } = req.params;

    const insert_by = req.admin.username;
    const update_by = req.admin.username;

    let photoFile = "";

    if (req.file) {
        photoFile = req.file.base64;
    }

    const { 
        nama,
        alamat,
        gend,
        tgl_lahir,
    } = req.body;

    const { status_api, status_code, message, data} = await staffService.handleUpdateStaff({
        nip,
        nama,
        alamat,
        gend,
        photo: photoFile,
        tgl_lahir,
        insert_by,
        update_by
    });

    res.status(status_code).send({
        status: status_api,
        message: message,
        data: data,
    });

};

/* ------------------- End Update Staff Data ------------------- */


/* ------------------- Deactivate Staff ------------------- */

const handleDeactivateStaff = async(req, res) => {
    const { nip } = req.params;

    const { status } = req.body;

    const { status_api, status_code, message, data} = await staffService.handleDeactivateStaff({
        nip,
        status
    });

    res.status(status_code).send({
        status: status_api,
        message: message,
        data: data,
    });
};

/* ------------------- End Deactivate Staff ------------------- */


module.exports = { handleCreateNewStaff, handleGetAllStaff, handleUpdateStaff, handleDeactivateStaff }
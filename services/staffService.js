const staffRepository = require("../repositories/staffRepository");

class StaffService {

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

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!nama) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name is required!",
                    data: {
                        staffCreate: null,
                    },
                };
            }
            if (!alamat) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Address is required!",
                    data: {
                        staffCreate: null,
                    },
                };
            }
            if (!gend) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Gender is required!",
                    data: {
                        staffCreate: null,
                    },
                };
            }
            if (!tgl_lahir) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Birthday is required!",
                    data: {
                        staffCreate: null,
                    },
                };
            }
            if (!photo) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Photo is required!",
                    data: {
                        staffCreate: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //
            
            const staffCreate = await staffRepository.handleCreateNewStaff({
                nip,
                nama,
                alamat,
                gend,
                photo,
                tgl_lahir,
                id: 0,
                insert_by,
                update_by
            });
    
            return {
                status: true,
                status_code: 201,
                message: "Successfully created new staff",
                data: {
                    staffCreate: staffCreate
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    staffCreate: null
                },
            }
        };

    };

    /* ------------------- End Create New Staff ------------------- */


    /* ------------------- Handle Get All Staff ------------------- */

    static async handleGetAllStaff({ nama, start, count }) {
        try {

            const getData = await staffRepository.handleGetAllStaff({ nama, start, count });

            if (!getData) {
                throw new Error('Staff cannot found');
            }

            return {
                status: true,
                status_code: 201,
                message: "Staff data displayed successfully(:",
                data: {
                    handleGetAllStaff: getData,
                },
            }; 
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    handleGetAllStaff: null,
                },
            };

        }
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

        try {
            
            const getStaff = await staffRepository.handleGetStaffByNIP({ nip });

            if (!getStaff) {
                throw new Error('Staff cannot found');
            }

            // ------------------------- Payload Validation ------------------------- //

            if (getStaff.nip == nip) {
                if (!nip){
                    nip = getStaff.nip;
                }
                
                if (!nama){
                    nama = getStaff.nama;
                }

                if (!alamat){
                    alamat = getStaff.lecturerId;
                }

                if (!gend){
                    gend = getStaff.gend;
                }

                if (!tgl_lahir){
                    tgl_lahir = getStaff.tgl_lahir;
                }
                
                if (!photo){
                    photo = getStaff.photo;
                }
            }

            // ------------------------- End Payload Validation ------------------------- //

            const updateStaff = await staffRepository.handleUpdateStaff({
                nip,
                nama,
                alamat,
                gend,
                photo,
                tgl_lahir,
                insert_by,
                update_by
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    updateStaff: updateStaff
                },
            };

        } catch (error) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updateStaff: null,
                },
            };
        }

    };

    /* ------------------- End Update Staff Data ------------------- */


    /* ------------------- Deactivate Staff ------------------- */

    static async handleDeactivateStaff({ nip, status }) {

        try {

            const getStaff = await staffRepository.handleGetStaffByNIP({ nip });

            if (!getStaff) {
                throw new Error('Staff cannot found');
            }

            const deactivateStaff = await staffRepository.handleDeactivateStaff({
                nip,
                status: 9
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    deactivateStaff: deactivateStaff
                },
            };
            
        } catch (error) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    deactivateStaff: null,
                },
            };
        }

    };

    /* ------------------- End Deactivate Staff ------------------- */


};

module.exports = StaffService;
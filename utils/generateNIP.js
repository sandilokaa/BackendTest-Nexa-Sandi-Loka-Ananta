const staffRepository = require("../repositories/staffRepository");

async function generateNIP() {
    const year = new Date().getFullYear();

    const lastStaff = await staffRepository.handleGetLastStaff({ year });
    
    let counter = 1;

    if (lastStaff && lastStaff.nip.length >= 4) {
        const lastNIP = lastStaff.nip;
        const lastCounter = parseInt(lastNIP.slice(4), 10);
        counter = lastCounter + 1;
    }

    const nip = `${year}${String(counter).padStart(4, '0')}`;

    return nip;
};

module.exports = { generateNIP };
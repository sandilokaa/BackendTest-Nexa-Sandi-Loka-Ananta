const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("./utils/photoUpload");

const app = express();
const PORT = 8080;

require('dotenv').config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// ------------------------- Public File Access ------------------------- //


// ------------------------- End Public File Access ------------------------- //



// ------------------------- Import Controllers ------------------------- //

const authController = require("./controllers/authController");
const staffController = require("./controllers/staffController");

// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/authMiddleware");

// ------------------------- End Import middlewares ------------------------- //



// ------------------------- Define Routes ------------------------- //


/* -------------- Auth Endpoint -------------- */

app.post('/api/v1/session', authController.handleAdminLogin);

/* -------------- End Auth Endpoint -------------- */


/* -------------- Staff Endpoint -------------- */

app.post('/api/v1/staffs', middleware.authenticate, fileUpload.upload, fileUpload.convertToBase64, staffController.handleCreateNewStaff);
app.get('/api/v1/staffs', middleware.authenticate, staffController.handleGetAllStaff);
app.put('/api/v1/staffs/:nip', middleware.authenticate, staffController.handleUpdateStaff);
app.put('/api/v1/staffs/deactivate/:nip', middleware.authenticate, staffController.handleDeactivateStaff);

/* -------------- End Staff Endpoint -------------- */


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;
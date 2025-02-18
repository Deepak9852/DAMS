let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate } = require('../controller/userEnquiryControllers');
let enquiryRoutes = express.Router();

enquiryRoutes.post("/Sdata_insert", enquiryInsert);
enquiryRoutes.get("/Sdata_read", enquiryList);
enquiryRoutes.delete("/Sdata_delete/:id", enquiryDelete);
enquiryRoutes.put("/Sdata_update/:id", enquiryUpdate);

module.exports = enquiryRoutes;
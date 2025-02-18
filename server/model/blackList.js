const mongoose = require('mongoose');

const BlackListSchema = new mongoose.Schema(
    {
        token:{
            type: String,
            required: true,
            ref: "User"
        },
    },
    {timestamps: true}
);

let blackListModel = mongoose.model("blackList", BlackListSchema);
module.exports = blackListModel;
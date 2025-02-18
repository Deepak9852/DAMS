const studentenquiryModel = require("../model/enquiryModel");

let enquiryInsert =  (req, res) => {
    let { name, email, phone, message } = req.body;
    let studentEnquiry = new studentenquiryModel({
      name,
      email,
      phone,
      message,
    });
    studentEnquiry
      .save()
      .then(() => {
        console.log("data saved");
        res.send({ status: 1, data: req.body });
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: 0 });
      });
  };

  let enquiryList = async (req, res) => {
    let enquiryData = await studentenquiryModel.find();
    res.status(200).json({ msg: "data get", data: enquiryData });
  };

  let enquiryDelete = async (req, res) => {
    let enquiryId = req.params.id;
    let deletedata = await studentenquiryModel.deleteOne({ _id: enquiryId });
    res.send({ data: deletedata });
  };

  let enquiryUpdate =  async (req, res) => {
    let enquiryId = req.params.id;
    let { name, email, phone, message } = req.body;
    let Sdata_update = {
      name,
      email,
      phone,
      message,
    };
    let studentEnquiryUpdate = await studentenquiryModel.updateOne(
      { _id: enquiryId },
      Sdata_update
    );
    res.send({ UpdateData:req.body});
  }

  module.exports = {enquiryInsert , enquiryList, enquiryDelete, enquiryUpdate }
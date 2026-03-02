const identify = require("../services/identifyService");

module.exports = async function(req, res) {
  try {
    const { email, phoneNumber } = req.body;
    const result = await identify( email, phoneNumber);
    res.status(200).json(result);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }};
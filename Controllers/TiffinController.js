const Tiffin = require('../models/tiffinServiceModel');



module.exports.get_tiffin = async (req, res, next) => {
  try {
    const tiffin = await Tiffin.find();

    return res.status(200).json({
      success: true,
      count: tiffin.length,
      data: tiffin,
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      error: 'Server error',
    });
  }
};







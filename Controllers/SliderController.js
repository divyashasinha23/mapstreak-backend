const slider = require('../models/SliderModel');


module.exports.show_slider_image = async (req, res, next) => {
  try {
    const slide = await slider.find();

    return res.status(200).json({
      success: true,
      data: slide,
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      error: 'Server error',
    });
  }
};

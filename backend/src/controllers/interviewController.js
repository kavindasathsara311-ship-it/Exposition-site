// interview is another name for contact us in this project

const prisma = require("../config/prisma");

const createInterviewRequest = async (req, res) => {
  try {
    const {
      name,
      designation,
      website,
      primaryContact,
      secondaryContact,
      message
    } = req.body;

    const request = await prisma.interviewRequest.create({
      data: {
        name,
        designation,
        website,
        primaryContact,
        secondaryContact,
        message
      }
    });

    res.status(201).json({
      success: true,
      data: request
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  createInterviewRequest
};
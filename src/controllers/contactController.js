const service =
require("../services/contactService");


exports.getAll =
async (req, res, next) => {

  try {

    const data =
    await service.getAllContacts();

    res.json(data);

  }
  catch (err) {

    next(err);
  }
};


exports.getById =
async (req, res, next) => {

  try {

    const data =
    await service.getContact(
      req.params.id
    );

    res.json(data);

  }
  catch (err) {

    next(err);
  }
};
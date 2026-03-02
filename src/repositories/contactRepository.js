const prisma = require("../config/prisma");

exports.findMatchingContacts =
(email, phoneNumber) => {

  return prisma.contact.findMany({

    where: {
      deletedAt: null,
      OR: [
        email ? { email } : undefined,
        phoneNumber ? { phoneNumber } : undefined
      ].filter(Boolean)
    },

    orderBy: {
      createdAt: "asc"
    }
  });
};


exports.createContact = (data) => {

  return prisma.contact.create({
    data
  });

};


exports.updateContact = (id, data) => {

  return prisma.contact.update({
    where: { id },
    data
  });

};


exports.findAllLinked =
(primaryId) => {

  return prisma.contact.findMany({

    where: {
      OR: [
        { id: primaryId },
        { linkedId: primaryId }
      ]
    },

    orderBy: {
      createdAt: "asc"
    }
  });
};

exports.getAllContacts = () => {

  return prisma.contact.findMany({

    where: {
      deletedAt: null
    },

    orderBy: {
      createdAt: "asc"
    }
  });
};


exports.getContactById = (id) => {

  return prisma.contact.findUnique({

    where: {
      id: Number(id)
    }
  });
};


exports.getGraphByPrimaryId =
(primaryId) => {

  return prisma.contact.findMany({

    where: {

      OR: [
        { id: primaryId },
        { linkedId: primaryId }
      ]
    }
  });
};
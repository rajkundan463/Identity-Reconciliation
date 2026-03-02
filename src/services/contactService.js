const repo =
require("../repositories/contactRepository");

const {
  formatContactResponse
} =
require("../utils/contactFormatter");

const {
  formatGraph
} =
require("../utils/graphFormatter");


exports.getAllContacts =
async () => {

  return repo.getAllContacts();
};


exports.getContact =
async (id) => {

  const contact =
  await repo.getContactById(id);

  if (!contact)
    throw new Error("Not found");

  const primaryId =
    contact.linkedId || contact.id;

  const linked =
  await repo.getGraphByPrimaryId(
    primaryId
  );

  return {

    contact:
    formatContactResponse(linked),

    graph:
    formatGraph(
      linked,
      primaryId
    )
  };
};
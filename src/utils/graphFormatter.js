exports.formatGraph = (contacts, primaryId) => {

  const nodes = contacts.map(c => ({
    id: String(c.id),
    type: c.linkPrecedence,
    email: c.email,
    phoneNumber: c.phoneNumber
  }));

  const edges = contacts
    .filter(c => c.linkedId)
    .map(c => ({
      source: String(c.linkedId),
      target: String(c.id)
    }));

  return { nodes, edges };
};
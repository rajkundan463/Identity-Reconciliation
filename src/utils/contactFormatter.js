exports.formatContactResponse =
(contacts) => {

  const primary =
    contacts.find(
      c => c.linkPrecedence === "primary"
    );

  return {

    primaryContatctId: primary.id,

    emails:
      [...new Set(
        contacts
          .map(c => c.email)
          .filter(Boolean)
      )],

    phoneNumbers:
      [...new Set(
        contacts
          .map(c => c.phoneNumber)
          .filter(Boolean)
      )],

    secondaryContactIds:

      contacts
        .filter(
          c => c.linkPrecedence === "secondary"
        )
        .map(c => c.id)
  };
};
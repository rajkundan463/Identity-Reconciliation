const prisma = require("../config/prisma");

// FIND ROOT PRIMARY (like Union-Find find())

function findPrimary(contact, allContacts) {

  if (contact.linkPrecedence === "primary")
    return contact;

  return allContacts.find(
    c => c.id === contact.linkedId
  );
}

// GET FULL CONNECTED COMPONENT
 
async function getFullComponent(primaryId) {

  return prisma.contact.findMany({
    where: {
      OR: [
        { id: primaryId },
        { linkedId: primaryId }
      ],
      deletedAt: null
    },
    orderBy: {
      createdAt: "asc"
    }
  });
}


// MAIN IDENTIFY FUNCTION
 
async function identify(email, phoneNumber) {

  if (!email && !phoneNumber)
    throw new Error("email or phone required");

  
// STEP 1
// find all matching nodes
   
  const matches = await prisma.contact.findMany({
    where: {
      OR: [
        email ? { email } : undefined,
        phoneNumber ? { phoneNumber } : undefined
      ].filter(Boolean),
      deletedAt: null
    },
    orderBy: {
      createdAt: "asc"
    }
  });

// STEP 2
// no component exists → create new
   
  if (matches.length === 0) {

    const newContact =
      await prisma.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: "primary"
        }
      });

    return formatResponse([newContact]);
  }


//  STEP 3
//  find all primaries involved

  let primaries = [];

  for (const contact of matches) {

    if (contact.linkPrecedence === "primary")
      primaries.push(contact);

    else {

      const primary =
        matches.find(
          c => c.id === contact.linkedId
        ) ||
        await prisma.contact.findUnique({
          where: { id: contact.linkedId }
        });

      primaries.push(primary);
    }
  }

// STEP 4
// choose OLDEST primary (DSU root)

  primaries.sort(
    (a,b) =>
      new Date(a.createdAt)
      -
      new Date(b.createdAt)
  );

  const root = primaries[0];


// STEP 5
// UNION operation
// convert other primaries → secondary

  for (const p of primaries) {

    if (p.id === root.id)
      continue;

    await prisma.contact.update({
      where: { id: p.id },
      data: {
        linkPrecedence: "secondary",
        linkedId: root.id
      }
    });
  }
// STEP 6
// check if new node needed

  const emailExists =
    matches.some(c => c.email === email);

  const phoneExists =
    matches.some(c => c.phoneNumber === phoneNumber);


  if (
    (email && !emailExists)
    ||
    (phoneNumber && !phoneExists)
  ) {

    await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkedId: root.id,
        linkPrecedence: "secondary"
      }
    });
  }
// STEP 7
// fetch full component
  const component =
    await getFullComponent(root.id);


  return formatResponse(component);
}

// FORMAT RESPONSE

function formatResponse(contacts) {

  const primary =
    contacts.find(
      c => c.linkPrecedence === "primary"
    );

  const emails =
    [...new Set(
      contacts
        .map(c => c.email)
        .filter(Boolean)
    )];

  const phones =
    [...new Set(
      contacts
        .map(c => c.phoneNumber)
        .filter(Boolean)
    )];

  const secondaryIds =
    contacts
      .filter(
        c =>
        c.linkPrecedence === "secondary"
      )
      .map(c => c.id);


  return {

    contact: {

      primaryContatctId:
        primary.id,

      emails,

      phoneNumbers: phones,

      secondaryContactIds:
        secondaryIds

    }

  };

}


module.exports = identify;
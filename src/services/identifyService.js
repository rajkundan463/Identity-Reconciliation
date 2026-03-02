const prisma = require("../config/prisma");


/* Resolve true root primary
 -> Uses iterative resolution */

async function resolvePrimary(contact, cache) {

  if (cache.has(contact.id))
    return cache.get(contact.id);

  let current = contact;

  while (
    current.linkPrecedence === "secondary" &&
    current.linkedId
  ) {

    if (cache.has(current.linkedId)) {
      current = cache.get(current.linkedId);
      break;
    }

    current =
      await prisma.contact.findUnique({
        where: { id: current.linkedId }
      });

  }

  cache.set(contact.id, current);

  return current;
}


/* Fetch FULL connected component safely */

async function getFullComponent(rootId) {

  const all =
    await prisma.contact.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "asc" }
    });

  const result = [];

  const cache = new Map();

  for (const contact of all) {

    const primary =
      await resolvePrimary(contact, cache);

    if (primary.id === rootId)
      result.push(contact);
  }

  return result;
}


/* Format response according to spec */

function formatResponse(contacts) {

  const primary =
    contacts.find(
      c => c.linkPrecedence === "primary"
    );

  const emails =
    [
      ...new Set(
        contacts
          .map(c => c.email)
          .filter(Boolean)
      )
    ];

  const phoneNumbers =
    [
      ...new Set(
        contacts
          .map(c => c.phoneNumber)
          .filter(Boolean)
      )
    ];

  const secondaryContactIds =
    contacts
      .filter(
        c => c.linkPrecedence === "secondary"
      )
      .map(c => c.id);


  return {

    contact: {

      primaryContatctId: primary.id,

      emails,

      phoneNumbers,

      secondaryContactIds

    }

  };

}


/* MAIN IDENTIFY FUNCTION */

async function identify(email, phoneNumber) {

  if (!email && !phoneNumber)
    throw new Error(
      "email or phoneNumber required"
    );


  // STEP 1 find matches
  const conditions = [];

  if (email)
    conditions.push({ email });

  if (phoneNumber)
    conditions.push({ phoneNumber });


  const matches =
    await prisma.contact.findMany({

      where: {
        OR: conditions,
        deletedAt: null
      },

      orderBy: {
        createdAt: "asc"
      }

    });


  // STEP 2 create primary if none
  if (matches.length === 0) {

    const created =
      await prisma.contact.create({

        data: {
          email,
          phoneNumber,
          linkPrecedence: "primary"
        }

      });

    return formatResponse([created]);
  }


  // STEP 3 resolve all primaries
  const cache = new Map();
  const primaryMap = new Map();

  for (const contact of matches) {

    const primary =
      await resolvePrimary(contact, cache);

    primaryMap.set(primary.id, primary);
  }


  const primaries =
    Array.from(primaryMap.values());


  // STEP 4 choose OLDEST root
  primaries.sort(
    (a,b) =>
      new Date(a.createdAt)
      -
      new Date(b.createdAt)
  );

  const root = primaries[0];


  // STEP 5 enforce union
  await prisma.$transaction(async (tx) => {

    // ensure root is primary
    await tx.contact.update({

      where: { id: root.id },

      data: {
        linkPrecedence: "primary",
        linkedId: null
      }

    });


    for (const p of primaries) {

      if (p.id === root.id)
        continue;

      await tx.contact.update({

        where: { id: p.id },

        data: {
          linkPrecedence: "secondary",
          linkedId: root.id
        }

      });

    }


    const emailExists =
      matches.some(
        c => c.email === email
      );

    const phoneExists =
      matches.some(
        c => c.phoneNumber === phoneNumber
      );


    if (
      (email && !emailExists)
      ||
      (phoneNumber && !phoneExists)
    ) {

      await tx.contact.create({

        data: {
          email,
          phoneNumber,
          linkedId: root.id,
          linkPrecedence: "secondary"
        }

      });

    }

  });


  // STEP 6 fetch FULL component
  const component =
    await getFullComponent(root.id);


  return formatResponse(component);

}


module.exports = identify;
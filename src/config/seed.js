const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  console.log("Seeding database...");

  // Primary contact
  const primary =
  await prisma.contact.create({

    data: {
      email: "lorraine@hillvalley.edu",
      phoneNumber: "123456",
      linkPrecedence: "primary"
    }
  });


  // Secondary contact
  await prisma.contact.create({

    data: {

      email: "mcfly@hillvalley.edu",

      phoneNumber: "123456",

      linkedId: primary.id,

      linkPrecedence: "secondary"
    }
  });


  // another primary
  await prisma.contact.create({

    data: {

      email: "doc@flux.com",

      phoneNumber: "999999",

      linkPrecedence: "primary"
    }
  });


  console.log("Seed completed");
}

main()
.then(() => prisma.$disconnect())
.catch(e => {

  console.error(e);

  prisma.$disconnect();

  process.exit(1);
});
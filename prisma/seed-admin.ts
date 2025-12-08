import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "pendtiumpraz@gmail.com";

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    // Update to SUPER_ADMIN
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: Role.SUPER_ADMIN },
    });
    console.log(`✅ Updated ${adminEmail} to SUPER_ADMIN`);
  } else {
    console.log(`⚠️ User ${adminEmail} not found. They need to login first, then run this script again.`);
  }

  // List all admins
  const admins = await prisma.user.findMany({
    where: { role: { in: [Role.ADMIN, Role.SUPER_ADMIN] } },
    select: { email: true, name: true, role: true },
  });

  console.log("\n📋 Current Admins:");
  admins.forEach((admin) => {
    console.log(`   - ${admin.name} (${admin.email}) - ${admin.role}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

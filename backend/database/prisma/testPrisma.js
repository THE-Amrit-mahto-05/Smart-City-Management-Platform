const prisma = require('./config');
async function main() {
  try {
    console.log("Testing Prisma + MySQL connection...");
    const user = await prisma.user.upsert({
      where: { email: "test@example.com" },
      update: {},
      create: {
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password_here", 
        role: "ADMIN"
      }
    });
    console.log("Prisma connection successful!");
    console.log("User record:", user);
  } catch (err) {
    console.error("Prisma connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}
main();

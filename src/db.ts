import { PrismaClient } from "@prisma/client";

// database connection initialization
const prisma = new PrismaClient()
// this is imported in handler or where ever db connection is required
export default prisma
#!/usr/bin/env node
/**
 * Cria (ou atualiza) um usuário do admin.
 *
 * Uso (no servidor, dentro de /opt/recombo-web):
 *   node --env-file=.env scripts/create-admin.mjs email@exemplo.com 'senha-forte' 'Nome' admin
 *
 * O último argumento é o papel: admin | editor | viewer (padrão: admin).
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const [email, password, name = "", roleArg = "admin"] = process.argv.slice(2);
const roles = ["admin", "editor", "viewer"];

if (!email || !password) {
  console.error("uso: node --env-file=.env scripts/create-admin.mjs <email> <senha> [nome] [admin|editor|viewer]");
  process.exit(1);
}
if (password.length < 8) {
  console.error("erro: a senha precisa ter ao menos 8 caracteres");
  process.exit(1);
}
if (!roles.includes(roleArg)) {
  console.error(`erro: papel inválido (${roles.join(", ")})`);
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hash, name: name || undefined, role: roleArg },
    create: { email, password: hash, name: name || null, role: roleArg },
  });
  console.log(`ok: ${user.email} (${user.role})`);
} catch (error) {
  console.error("falhou:", error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du peuplement de la base de données...');

  // 1. Création du Tenant "Collectif" (Le compte global)
  const collective = await prisma.tenant.upsert({
    where: { siren: '000000000' },
    update: {},
    create: {
      name: 'Collectif Cobalt',
      siren: '000000000',
      address: 'Adresse du Collectif',
    },
  });

  // 2. Création de votre propre Micro-entreprise
  const myAgency = await prisma.tenant.upsert({
    where: { siren: '123456789' }, // Remplacez par votre vrai SIREN
    update: {},
    create: {
      name: 'Gambi Architecture',
      siren: '123456789',
      address: 'Votre Adresse',
    },
  });

  // 3. Création de votre compte Super Admin (lié à votre agence)
  const hashedPassword = await bcrypt.hash('VotreMotDePasseSecurise123!', 10); // Attention a bien changer ça lors du déploiement.
  
  await prisma.user.upsert({
    where: { email: 'votre-email@exemple.com' },
    update: {},
    create: {
      email: 'votre-email@exemple.com',
      name: 'Gambi',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      tenantId: myAgency.id,
    },
  });

  console.log('Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
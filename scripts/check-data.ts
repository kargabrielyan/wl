import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  try {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const userCount = await prisma.user.count();
    
    console.log('Products:', productCount);
    console.log('Orders:', orderCount);
    console.log('Users:', userCount);
    
    if (productCount === 0) {
      console.log('No products found. Need to seed data.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();



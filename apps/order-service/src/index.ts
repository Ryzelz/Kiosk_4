import { clerkPlugin } from '@clerk/fastify';
import Fastify from "fastify";

const fastify = Fastify();

fastify.register(clerkPlugin, {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});
  

fastify.get("/health", (request, reply ) => {
  return reply.status(200).send ({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now() 
  });
});

fastify.get("/test", (request, reply) => {
  const { userId } = (request as any).auth || {};

  if (!userId) {
    return reply.status(401).send({ message: "you are not logged in" });
  } 
  return reply.send({ message: "Order service Authenticated" });
  
});


const start = async () => {
  try {
    await fastify.listen({ port: 8001, host: '0.0.0.0' }); 
    console.log('Order service is running on port 8001');
  } catch (err) {
    console.error('Failed to start order service:', err);
    process.exit(1);
  }
};

start();    
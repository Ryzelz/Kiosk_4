import { getAuth, clerkMiddleware } from '@hono/clerk-auth';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { shouldBeUser } from './middleware/authMiddleware.js';

const app = new Hono()
app.use('*', clerkMiddleware())

app.get('/health', (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now() 
  });
})
import { time } from 'node:console';
import { uptime } from 'node:process';
import { clerkMiddleware } from '@hono/clerk-auth'
import { shouldBeUser } from './middleware/authMiddleware.js';

const app = new Hono();

// Register Clerk middleware globally
app.use('*', clerkMiddleware());

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

app.get('/test', shouldBeUser, (c) => {
  return c.json({
    message: 'payment service is Authenticated', 
    userId: c.get("userId")
  });
});

app.get('/test', shouldBeUser, (c) => {
  // For testing only - in production, add proper Clerk authentication


  return c.json({
    message: "Payment service Authenticated"
  });
});

const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, 
    (info) => {
      console.log(`Payment service is running on port 8002`);
    }
  );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

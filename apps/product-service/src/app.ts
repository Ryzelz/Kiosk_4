import express, { Express, Request, Response } from "express";
import cors from "cors";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { clerkMiddleware } from "@clerk/express";
import { productRouter } from "./routes/product.route.js";
import { categoryRouter } from "./routes/category.route.js";

const app: Express = express();

// CORS must be first — before Clerk and body parsers — so preflight OPTIONS requests are handled
app.use(
    cors({
        origin: true, // allow all origins in development
        credentials: true,
    })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.text({ type: '*/*', limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Custom middleware to ensure body is properly parsed
app.use((req: Request, res: Response, next: Function) => {
    if (typeof req.body === 'string') {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {
            // If not valid JSON string, leave as is
        }
    }
    next();
});

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
    res.json({ message: "Product service authenticated", userId: req.userId });
});

app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: Function) => {
    console.log(err);
    return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

export default app;

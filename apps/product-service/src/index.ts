import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();
app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3002"],
    credentials: true,
})
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now() 
  });
});

app.get("/test" , (req: Request, res: Response) => {
    const auth = getAuth(req);
    const userID = auth.userId;

    if (!userID) {
        return res.status(401).json({ message: "you are not logged in" });
    }
    res.json({ message: "Product service Authorized" });
});

app.listen(8000, () => {
    console.log("Product service is running on port 8000");
});
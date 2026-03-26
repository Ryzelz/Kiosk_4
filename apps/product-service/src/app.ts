import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3002", "http://localhost:3003"],
        credentials: true,
    })
);

// In-memory product data
const products = [
    {
        id: 1,
        name: "Cold Brew Coffee",
        shortDescription: "Smooth, low-acid cold brew coffee.",
        description: "Slow-steeped for 12 hours.",
        price: 250,
        sizes: ["250ml", "1L", "2L"],
        colors: ["black", "white"],
        images: { "250ml": "/products/cold_brew_bottle-250ml.png" },
        category: "Coffee",
    },
    {
        id: 2,
        name: "Guji Uraga Tome Beans",
        shortDescription: "Single origin Ethiopian coffee beans.",
        description: "Natural process, floral and fruity notes.",
        price: 500,
        sizes: ["200g"],
        colors: [""],
        images: { "200g": "/products/Guji_uraga_tome_beans-200g.png" },
        category: "Beans",
    },
    {
        id: 3,
        name: "Caturra and Bourbon Beans",
        shortDescription: "Classic Central American blend.",
        description: "Balanced with chocolate and nut notes.",
        price: 400,
        sizes: ["200g"],
        colors: [""],
        images: { "200g": "/products/Caturra_Bourbon-200g.png" },
        category: "Beans",
    },
];

// In-memory user store for auth demo
const users: { email: string; password: string; name: string }[] = [];

// GET /api/products
app.get("/api/products", (_req, res) => {
    res.json(products);
});

// GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    res.json(product);
});

// POST /api/auth/register
app.post("/api/auth/register", (req, res) => {
    const { email, password, name } = req.body as { email: string; password: string; name: string };
    if (!email || !password || !name) {
        res.status(400).json({ error: "email, password, and name are required" });
        return;
    }
    if (users.find((u) => u.email === email)) {
        res.status(409).json({ error: "User already exists" });
        return;
    }
    users.push({ email, password, name });
    res.status(201).json({ message: "User registered" });
});

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    // Return a mock token for testing purposes
    res.json({ token: `mock-token-${user.email}` });
});

app.get("/", (_req, res) => {
    res.json("Product service is working");
});

export default app;

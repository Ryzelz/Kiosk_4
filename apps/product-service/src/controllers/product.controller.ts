import {Request, Response} from "express";
import { prisma, Prisma } from "@repo/product-db";

type CreateProductBody = {
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    categorySlug: string;
    color?: string[];
    colors?: string[];
    size?: string[];
    sizes?: string[];
    imageUrl?: Prisma.InputJsonValue;
    images?: Prisma.InputJsonValue;
    sugar?: string[];
    milk?: string[];
    extraShot?: string[];
};

export const createProduct = async (req:Request, res:Response) => {
    try {
        const body = req.body as CreateProductBody;

        const { name, shortDescription, description, price, categorySlug, sugar, milk, extraShot } = body;
        const colorList = body.color ?? body.colors ?? [];
        const sizeList = body.size ?? body.sizes ?? [];
        const imageData = body.imageUrl ?? body.images;

        if (!name || !shortDescription || !description || price === undefined || !categorySlug) {
            return res.status(400).json({
                message: "Missing required fields",
                requiredFields: ["name", "shortDescription", "description", "price", "categorySlug"],
            });
        }

        if (!imageData || typeof imageData !== "object") {
            return res.status(400).json({ message: "Images object is required" });
        }

        const data: Prisma.ProductCreateInput = {
            name,
            shortDescription,
            description,
            price: typeof price === "string" ? parseInt(price) : price,
            imageUrl: imageData,
            color: colorList,
            size: sizeList,
            sugar: sugar ?? [],
            milk: milk ?? [],
            extraShot: extraShot ?? [],
            category: { connect: { slug: categorySlug } },
        };

        const product = await prisma.product.create({ data });
        return res.status(201).json(product);
    } catch (error: any) {
        console.error("Create product error:", error);
        return res.status(400).json({ message: error.message || "Failed to create product" });
    }
}



export const updateProduct = async (req:Request, res:Response) => {}
export const deleteProduct = async (req:Request, res:Response) => {}
export const getProduct = async (req:Request, res:Response) => {}
export const getProducts = async (req:Request, res:Response) => {
    try {
        const { category } = req.query;
        const products = await prisma.product.findMany({
            where: category ? { categorySlug: String(category) } : undefined,
            include: { category: true },
        });
        return res.status(200).json(products);
    } catch (error: any) {
        console.error("Get products error:", error);
        return res.status(500).json({ message: error.message || "Failed to fetch products" });
    }
}
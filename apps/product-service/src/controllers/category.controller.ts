import {Request, Response} from "express";
import { prisma } from "@repo/product-db";

type CategoryCreateData = Parameters<typeof prisma.category.create>[0]["data"];

export const createCategory = async (req:Request, res:Response) => {
    try {
        let body = req.body;

        if (typeof body === "string") {
            try {
                body = JSON.parse(body);
            } catch {
                body = {};
            }
        }

        if (
            body &&
            typeof body === "object" &&
            !Array.isArray(body) &&
            Object.keys(body).length === 1
        ) {
            const onlyKey = (Object.keys(body)[0] ?? "").trim();
            if (onlyKey.startsWith("{") && onlyKey.endsWith("}")) {
                try {
                    body = JSON.parse(onlyKey);
                } catch {
                    // keep original body if parsing fails
                }
            }
        }

        const { name, slug } = body || {};

        if (!name || !slug) {
            return res.status(400).json({
                message: "Missing required fields",
                requiredFields: ["name", "slug"],
                receivedFields: body && typeof body === "object" && !Array.isArray(body) ? Object.keys(body) : []
            });
        }

        const data: CategoryCreateData = { name, slug };

        let category;
        try {
            category = await prisma.category.upsert({
                where: { slug },
                update: { name },
                create: data
            });
        } catch (error: any) {
            // In high-concurrency scenarios, upsert can still race and hit P2002.
            // Fallback to update ensures idempotent behavior for repeated calls.
            if (error?.code === "P2002") {
                category = await prisma.category.update({
                    where: { slug },
                    data: { name }
                });
            } else {
                throw error;
            }
        }

        return res.status(201).json(category);
    } catch (error: any) {
        return res.status(400).json({ message: error.message || "Failed to create category" });
    }
};
export const updateCategory = async (req:Request, res:Response) => {}
export const deleteCategory = async (req:Request, res:Response) => {}
export const getCategory = async (req:Request, res:Response) => {}
export const getCategories = async (req:Request, res:Response) => {}
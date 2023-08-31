import { PrismaClient } from "@prisma/client";
import { HTTP } from "../error/mainError";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";

const prisma = new PrismaClient();

export const readProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.store.findMany({});
    return res
      .status(HTTP.OK)
      .json({ message: "view product ", data: product });
  } catch (error: any) {
    return res
      .status(HTTP.BAD_REQUEST)
      .json({ message: "Error", error: error.message });
  }
};

export const createProduct = async (req: any, res: Response) => {
  try {
    const { title, cost } = req.body;

    const image = await cloudinary.uploader.upload(req.file.path);

    const product = await prisma.store.create({
      title,
      cost,
      image: image.secure_url,
    });

    return res
      .status(HTTP.OK)
      .json({ message: "view product ", data: product });
  } catch (error: any) {
    return res
      .status(HTTP.BAD_REQUEST)
      .json({ message: "Error", error: error.message });
  }
};

export const detailedProduct = async (req: any, res: Response) => {
  try {
    const { title, cost } = req.body;
    const { productID } = req.params;

    const product = await prisma.store.findUnique({
      where: { productID },
    });

    return res
      .status(HTTP.OK)
      .json({ message: "view product ", data: product });
  } catch (error: any) {
    return res
      .status(HTTP.BAD_REQUEST)
      .json({ message: "Error", error: error.message });
  }
};

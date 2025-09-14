import { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage";

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      message,
    });

    res
      .status(201)
      .json({ message: "Message stored successfully", data: newMessage });
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to store message" });
  }
};
import express from "express";
import Thread from "../models/thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            // create new thread
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        // Get assistant reply safely
        const assistantReply = await getOpenAIAPIResponse(message);

        // Push to thread safely
        thread.messages.push({
            role: "assistant",
            content: assistantReply || "Sorry, I couldn't generate a response."
        });

        thread.updatedAt = new Date();

        await thread.save();

        res.json({ reply: assistantReply });

    } catch (err) {
        console.error("Chat Route Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;

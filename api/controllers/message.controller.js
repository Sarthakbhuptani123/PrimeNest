import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
export const deleteMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const id = req.params.id;

  try {
    const message = await prisma.message.findUnique({
      where: { id },
    });

    if (!message) return res.status(404).json({ message: "Message not found!" });
    if (message.userId !== tokenUserId) return res.status(403).json({ message: "Not authorized!" });

    await prisma.message.delete({
      where: { id },
    });

    res.status(200).json({ message: "Message deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete message!" });
  }
};

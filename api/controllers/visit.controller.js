import prisma from "../lib/prisma.js";

export const createVisit = async (req, res) => {
    const tokenUserId = req.userId;
    const { postId, date } = req.body;

    try {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (post.userId === tokenUserId) {
            return res.status(400).json({ message: "Cannot book a visit to your own property!" });
        }

        const newVisit = await prisma.visit.create({
            data: {
                date: new Date(date),
                user: {
                    connect: {
                        id: tokenUserId,
                    },
                },
                post: {
                    connect: {
                        id: postId,
                    },
                },
            },
        });
        res.status(200).json(newVisit);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create visit!" });
    }
};

export const getVisits = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        // Visits initiated by the current user (Buyer view)
        const visits = await prisma.visit.findMany({
            where: {
                userId: tokenUserId,
            },
            include: {
                post: true, // Include post details to show what they booked
            },
        });
        res.status(200).json(visits);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get visits!" });
    }
};

export const getVisitRequests = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        // Visits requested ON the current user's posts (Seller view)
        const visits = await prisma.visit.findMany({
            where: {
                post: {
                    userId: tokenUserId,
                },
            },
            include: {
                user: {
                    select: {
                        username: true,
                        email: true,
                        avatar: true,
                    }
                },
                post: {
                    select: {
                        title: true,
                    }
                }
            },
        });
        res.status(200).json(visits);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get visit requests!" });
    }
};

export const updateVisit = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body; // approved, rejected

    try {
        const updatedVisit = await prisma.visit.update({
            where: { id },
            data: { status },
        });
        res.status(200).json(updatedVisit);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update visit!" });
    }
};

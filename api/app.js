import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

import visitRoute from "./routes/visit.route.js";
import aiRoute from "./routes/ai.route.js";

const app = express();

app.use(cors({ origin: [process.env.CLIENT_URL, "http://localhost:5175", "http://localhost:5173", "https://prime-nest-ysj2.vercel.app"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/visits", visitRoute);
app.use("/api/ai", aiRoute);

// Only listen locally or if explicitly started (Vercel handles the export)
if (process.env.NODE_ENV !== "production") {
  app.listen(8800, () => {
    console.log("Server is running!");
  });
}

export default app;

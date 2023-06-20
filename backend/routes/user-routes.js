import express from "express";
import { getAllUsers } from "../controllers/user-controller";

// função de roteamento já que o react é uma aplicação de página única
// userRouter funcionará nesse módulo do express
// sempre que o link da url for "/user*variável*", ele responde com a respectiva função do controlador
// depois, exporta o userRouter
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

export default userRouter;
import express from "express";
import { getAllUsers, signup, updateUser } from "../controllers/user-controller";

// função de roteamento já que o react é uma aplicação de página única
// userRouter funcionará nesse módulo do express
// sempre que o link da url for "/user*variável*", ele responde com a respectiva função do controlador
// depois, exporta o userRouter
const userRouter = express.Router();

userRouter.get("/", getAllUsers); // requisições GET no link /user/ recebem de volta todos os usuários
userRouter.post("/signup", signup); // requisições POST no link /user/signup informam os inputs e recebem o id do novo usuário
userRouter.put("/:id", updateUser); // requisições PUT no link user/*id do usuário* informam o id do usuário a ser atualizado e informam os novos dados via input

export default userRouter;
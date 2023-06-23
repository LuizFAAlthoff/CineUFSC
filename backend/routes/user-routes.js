import express from "express";
import { getAllUsers, signup, updateUser, deleteUser, login, getUserById, getBookingsOfUser } from "../controllers/user-controller";

// função de roteamento já que o react é uma aplicação de página única
// userRouter funcionará nesse módulo do express
// sempre que o link da url for "/user*variável*", ele responde com a respectiva função do controlador
// depois, exporta o userRouter
const userRouter = express.Router();

userRouter.get("/", getAllUsers);                       // requisições GET no link /user/ recebem de volta todos os usuários
userRouter.post("/signup", signup);                     // requisições POST no link /user/signup informam os inputs e recebem o id do novo usuário
userRouter.put("/:id", updateUser);                    // requisições PUT no link /user/*id do usuário* informam o id do usuário a ser atualizado e informam os novos dados via input
userRouter.delete("/:id", deleteUser);                  // requisição DELETE no link /user/*id do usuário* que envia o id do usuário a ser excluído
userRouter.post("/login", login);                       // requisição POST no link /user/login que envia email e senha, e caso dê certo retorna o id do usuário logado
userRouter.get("/:id", getUserById);                    // requisição GET no ling /user/*id do usuário* que envia o id e recebe de volta o objeto usuário
userRouter.get("/bookings/:id", getBookingsOfUser);     // requisição GET no link /user/bookings/*id do usuário* que envia o id e recebe de volta todas as reservas do usuário

export default userRouter;
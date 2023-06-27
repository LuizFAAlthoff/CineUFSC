import express from "express";
import { addAdmin, adminLogin, getAdminById, getAdmins } from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);      // requisição POST no link /admin/signup que envia os dados do admin e recebe de volta o objeto novo admin
adminRouter.post("/login", adminLogin);     // requisição POST no link /admin/login que envia email e senha, e caso dê certo retorna o id do admin logado
adminRouter.get("/", getAdmins);            // requisições GET no link /admin/ recebem de volta todos os admins
adminRouter.get("/:id", getAdminById);      // requisição GET no link /admin/*id do admin* que envia o id e recebe de volta o objeto admin

export default adminRouter;

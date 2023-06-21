import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";

dotenv.config()
// isso serve para que, ao rodar o app, ele se comporte como o express
const app = express();

// middlewares (conexão)
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

// conexão com banco de dados mongodb através da biblioteca mongoose, e utiliza a chave secreta que está no .env
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cineufsc.h5lzjpb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
  // após, o servidor fica escutando na porta 5000 e manda uma mensagem no console confirmando que está rodando
    app.listen(5000, () =>
      console.log("Conectado ao servidor e servidor está funcionando")
    )
  )
  // qualquer erro nessa etapa aparece no log
  .catch((e) => console.log(e));
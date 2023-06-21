import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import movieRouter from "./routes/movie-routes";
import cors from "cors";
let teste = "oi"
dotenv.config()
// isso serve para que, ao rodar o app, ele se comporte como o express
const app = express();
const corsOptions = {
  origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
// middlewares (conexão)
app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userRouter);
app.use("/movie", movieRouter)

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
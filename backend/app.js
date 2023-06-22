import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import movieRouter from "./routes/movie-routes";
import adminRouter from "./routes/admin-routes";
import bookingsRouter from "./routes/booking-routes";
import cors from "cors";

// importa o dotenv para que o app possa acessar a chave secreta do banco de dados
dotenv.config()
// cria o app express 
const app = express();
// isso serve para que o app aceite requisições de outros domínios
const corsOptions = {
  origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
// o app usa o cors com as opções acima
app.use(cors(corsOptions));
// o app usa o express.json para que possa receber jsons
app.use(express.json());
// o app usa o userRouter para que possa acessar as diferentes rotas
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);
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
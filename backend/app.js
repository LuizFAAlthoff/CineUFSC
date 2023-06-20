import express from "express";

const app = express();

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cineufsc.h5lzjpb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Conectado ao servidor e servidor está funcionando")
    )
  )
  .catch((e) => console.log(e));
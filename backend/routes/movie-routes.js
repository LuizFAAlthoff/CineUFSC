import express from "express";
import { addMovie, getAllMovies, getMovieById, deleteMovie } from "../controllers/movie-controller";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);     // requisições GET no link /movie/ recebem de volta todos os filmes
movieRouter.get("/:id", getMovieById);  // requisição GET no link /movie/*id do filme* que envia o id e recebe de volta o objeto filme
movieRouter.post("/", addMovie);        // requisição POST no link /movie/ que envia os dados do filme e recebe de volta o id do novo filme
userRouter.delete("/:id", deleteMovie); // requisição DELETE no link /movie/*id do filme* que envia o id do filme a ser excluído

export default movieRouter;

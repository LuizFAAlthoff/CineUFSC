import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Movie from "../models/Movie";

// função para adicionar um filme
export const addMovie = async (req, res, next) => {
    // recebe a string "Bearer *token*" na requisição, então divide a string em um array e pega o segundo elemento
    const extractedToken = req.headers.authorization.split(" ")[1];
    // verifica se o token existe
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({message: "Token não encontrado"});
    }
    let adminId;
    // verifica se o token é válido, usando o token recebido no parâmetro, a chave secreta e uma função de callback, que recebe o erro e o token decodificado
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({message: `${err.message}`});
    } else {
        // se o token de login for válido, pega o id do admin que está logado para adicionar o filme posteriormente
        adminId = decrypted.id;
        return;
    }
    });
    // recebe os inputs de título, descrição, data de lançamento, url do poster, se é destaque e os atores no body da requisição
    const {title, description, releaseDate, posterUrl, featured, actors} = req.body;
    if (
        // verifica se os inputs estão vazios
        !title && title.trim() === "" &&
        !description && description.trim() == "" &&
        !posterUrl && posterUrl.trim() === ""
    ) {
    return res.status(422).json({message: "Inputs Inválidos"});
    }
    let movie;
    try {
        // cria um novo filme com os inputs recebidos
        movie = new Movie({
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin: adminId,
            posterUrl,
            title,
    });

    // inicia uma sessão com o mongoose pois serão feitas duas operações no banco de dados e é necessário que ambas sejam bem sucedidas. Caso contrário, nenhuma será executada
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    // salva o filme no banco de dados e adiciona o filme ao array de filmes adicionados pelo admin
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    // confirma a transação
    await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }
    if (!movie) {
        return res.status(500).json({message: "Falha na requisição"});
    }
    return res.status(201).json({ movie });
};

// função para receber todos os filmes
export const getAllMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (err) {
        return console.log(err);
    }
    if (!movies) {
        return res.status(500).json({message: "Falha na requisição"});
    }
    return res.status(200).json({movies});
};

// função para receber um filme pelo id fornecido
export const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!movie) {
        return res.status(404).json({message: "ID de filme inválido"});
    }
    return res.status(200).json({movie});
};
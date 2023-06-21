import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Movie from "../models/Movie";
export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token não encontrado" });
    }
    let adminId;
    // Verifica token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
    } else {
        adminId = decrypted.id;
        return;
    }
    });
    const { title, description, releaseDate, posterUrl, featured, actors } =
        req.body;
    if (
        !title &&
        title.trim() === "" &&
        !description &&
        description.trim() == "" &&
        !posterUrl &&
        posterUrl.trim() === ""
    ) {
    return res.status(422).json({ message: "Inputs Inválidos" });
    }
    let movie;
    try {
        movie = new Movie({
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin: adminId,
            posterUrl,
            title,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }
    if (!movie) {
        return res.status(500).json({ message: "Falha na requisição" });
    }
    return res.status(201).json({ movie });
};
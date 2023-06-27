import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";

// função de criar nova reserva
export const newBooking = async (req, res, next) => {
    // recebe as informações necessárias do body
    const {movie, date, seatNumber, user} = req.body;
    
    let existingMovie;
    let existingUser;
    // encontra o filme a ser manipulado e o usuário que vai agendar pelas promises
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingMovie) {
        return res.status(404).json({message: "Filme não existe"});
    }
    if (!user) {
        return res.status(404).json({message: "Usuário não existe"});
    }
    let booking;
  
    try {
        booking = new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
        });
        // inicia uma transação pois caso uma operação dê erro, todas as outras são revertidas
        const session = await mongoose.startSession();
        session.startTransaction();
        // sobre a reserva para o objeto do usuário
        existingUser.bookings.push(booking);
        // sobre a reserva para o objeto filme
        existingMovie.bookings.push(booking);
        // salva a sessão
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }
  
    if (!booking) {
        return res.status(500).json({ message: "Erro ao criar reserva" });
    }
    // retorna a reserva
    return res.status(201).json({booking});
};

// função de pegar a reserva pelo id
export const getBookingById = async (req, res, next) => {
    // recebe o id pelos parametros
    const id = req.params.id;
    let booking;
    try {
        // promise
        booking = await Bookings.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!booking) {
        return res.status(500).json({message: "Erro inesperado"});
    }
    // retorna o objeto reserva
    return res.status(200).json({booking});
};

// função para deletar a reserva
export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        // usando o método populate para preencher com dados reais, e não apenas com id's.
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        // inicia sessão
        session.startTransaction();
        // remove a reserva do objeto usuário
        await booking.user.bookings.pull(booking);
        // remove do filme
        await booking.movie.bookings.pull(booking);
        // salva
        await booking.movie.save({ session });
        await booking.user.save({ session });
        // encerra sessão
        session.commitTransaction();
    } catch (err) {
          return console.log(err);
    }
    if (!booking) {
        return res.status(500).json({message: "Erro ao deletar"});
    }
    return res.status(200).json({message: "Deletado com sucesso"});
};
  
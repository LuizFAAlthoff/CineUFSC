import express from "express";
import { deleteBooking, getBookingById, newBooking } from "../controllers/booking-controller";

const bookingsRouter = express.Router();

bookingsRouter.post("/", newBooking);           // requisição POST no link /booking/ que envia os dados da reserva e recebe de volta o id da nova reserva
bookingsRouter.get("/:id", getBookingById);     // requisição GET no link /booking/*id da reserva* que envia o id e recebe de volta o objeto reserva
bookingsRouter.delete("/:id", deleteBooking);   // requisição DELETE no link /booking/*id da reserva* que envia o id e deleta a reserva

export default bookingsRouter;
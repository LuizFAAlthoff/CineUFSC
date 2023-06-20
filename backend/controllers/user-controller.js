import User from "../models/User";

// função assíncrona que vai ser enviada quando o frontend (router do backend) solicitar todos os usuários do sistema
// retorna todos os usuários, e se falhar envia mensagem no log do console
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      return console.log(err);
    }
    if (!users) {
      return res.status(500).json({ message: "Erro ao enviar todos os usuários" });
    }
    return res.status(200).json({users});
  };
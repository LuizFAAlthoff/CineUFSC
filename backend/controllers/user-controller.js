import User from "../models/User";
import bcrypt from 'bcryptjs'
import Bookings from "../models/Bookings";

// função assíncrona que vai ser enviada quando o frontend (router do backend) solicitar todos os usuários do sistema
// retorna todos os usuários, e se falhar envia mensagem no log do console
// a função precisa ser assíncrona pois o retorno da promise do mongodb demora
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        // espera o retorno da promise
        users = await User.find();
    } catch (err) {
        // se em algum momento der erro, avisa no console
        return console.log(err);
    }
    if (!users) {
        // se não houver nada na variável users, informa erro
        return res.status(500).json({message: "Erro ao enviar todos os usuários"});
    }
    return res.status(200).json({users});
  };

// função assíncrona pra fazer o cadastro
export const signup = async (req, res, next) => {
    // recebe os valores das variáveis através do body da requisição
    const {name, email, password} = req.body;
    // se os inputs estiverem zoados, retorna mensagem de erro
    if (
        !name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({message: "Inputs inválidos"});
    }
    // se tiver tudo ok, usa a biblioteca bcrypt para criptografar a senha
    const hashedPassword = bcrypt.hashSync(password);
    // instancia um novo usuário, passando a senha criptografada como valor do atributo password
    let user;
    try {
        user = new User({name, email, password: hashedPassword});
        // espera salvar o novo usuário no mongodb
        user = await user.save();
    } catch (err) {
        //qualquer erro nessa etapa aparece no console
        return console.log(err);
    }
    if (!user) {
        // res 500 caso dê algum erro interno no servidor
        return res.status(500).json({ message: "Erro interno no servidor ao cadastrar novo usuário" });
    }
    // depois de tudo, responde com res 201 de criado com sucesso e retorna o id do novo usuário
    return res.status(201).json({ id: user._id });
};
// função assíncrona pra atualizar dados do usuário
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    // recebe os valores das variáveis através do body da requisição
    const {name, email, password} = req.body;
    if (
        !name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({message: "Inputs inválidos"});
    }
    const hashedPassword = bcrypt.hashSync(password);
  
    let user;
    try {
        // espera a promise encontrar o usuário pelo id e atualizar os dados dele com os novos valores recebidos
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hashedPassword,
        });
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({message: "Erro ao atualizar usuário"});
    }
    res.status(200).json({message: "Atualizado com sucesso"});
};

//função pra deletar usuário
export const deleteUser = async (req, res, next) => {
    // recebe o id do usuário a ser excluído pelos parametros da requisição (url)
    const id = req.params.id;
    let user;
    try {
        // espera a promise encontrar o objeto user pelo id
        user = await User.findByIdAndRemove(id);
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({message: "Erro interno no servidor ao excluir usuário"});
    }
    return res.status(200).json({ message: "Sucesso ao excluir usuário" });
};

// função para fazer login, que retorna o id do usuário atual caso tenha sucesso
export const login = async (req, res, next) => {
    // recebe os inputs de email e senha no body da requisição
    const {email, password} = req.body;
    if (!email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.status(422).json({message: "Inputs inválidos"});
    }
    // variável existingUser serve para 'segurar' o usuário logado
    let existingUser;
    try {
        // espera a promise, recebendo o usuário que bate com o email informado
        existingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err);
    }
  
    if (!existingUser) {
        // caso não exista o usuário com o mesmo email, sobe um status 404 de objeto não encontrado
        return res.status(404).json({message: "Não foi possível pegar o usuário com esse ID"});
    }
    // caso tenha encontrado, continua
    // criptografa a senha inserida e compara com a senha do usuário
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  
    if (!isPasswordCorrect) {
      return res.status(400).json({message: "Senha incorreta"});
    }
    // caso tudo dê certo, retorna mensagem no console e o id do usuário que ficará logado
    return res.status(200).json({message: "Login feito com sucesso", id: existingUser._id});
  };

// função que pega o objeto usuário pelo id fornecido
export const getUserById = async (req, res, next) => {
    // recebe o id pelos parâmetros do request (url)
    const id = req.params.id;
    let user;
    try {
        // recebe o objeto user pela promise
        user = await User.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({message: "Erro interno no servidor ao enviar usuário"});
    }
    // caso dê tudo certo, retorna o objeto
    return res.status(200).json({user});
  };

  // função que pega todas as reservas de um usuário	
export const getBookingsOfUser = async (req, res, next) => {
    // recebe o id do usuário pelos parâmetros do request (url)
    const id = req.params.id;
    let bookings;
    try {
        // recebe o objeto bookings pela promise e popula os atributos movie e user
        bookings = await Bookings.find({user: id}).populate("movie").populate("user");
    } catch (err) {
        return console.log(err);
    }
    if (!bookings) {
        return res.status(500).json({message: "Erro interno ao pegar reservas do usuário"});
    }
    return res.status(200).json({bookings});
  };
import User from "../models/User";
import bcrypt from 'bcryptjs'

// função assíncrona que vai ser enviada quando o frontend (router do backend) solicitar todos os usuários do sistema
// retorna todos os usuários, e se falhar envia mensagem no log do console
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
        return res.status(500).json({ message: "Erro ao enviar todos os usuários" });
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
        return res.status(422).json({ message: "Inputs inválidos" });
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

// função para alterar/atualizar os dados de um certo usuário
export const updateUser = async (req, res, next) => {
    //recebe o id via parâmetros (url) do request
    const id = req.params.id;
    // recebe demais informações a ser atualizada pelo body do request
    const { name, email, password } = req.body;
    // se as novas informações forem improcessáveis pelo servidor, sobe um alerta 422
    if (
        !name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({ message: "Inputs não processáveis pelo servidor" });
    }
    //a nova senha é criptografada
    const hashedPassword = bcrypt.hashSync(password);
    // recebe o usuário através de uma promise e atualiza os dados, utilizando as novas informações
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hashedPassword,
        });
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Erro interno no servidor ao atualizar usuário" });
    }
    // qualquer erro ocorrido cai nos catchs anteriores, e se der tudo certo, manda mensagem no console
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  };
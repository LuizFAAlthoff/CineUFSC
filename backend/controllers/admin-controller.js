import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// função de criar novo administrador
export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({message: "Inputs Inválidos"});
}

    let existingAdmin;
    try {
        // promise que procura o administrador pelo email para ver se já existe
        existingAdmin = await Admin.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if (existingAdmin) {
        return res.status(400).json({message: "Administrador já cadastrado"});
    }
    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({email, password: hashedPassword});
        admin = await admin.save();
    } catch (err) {
        return console.log(err);
    }
    if (!admin) {
        return res.status(500).json({message: "Não foi possível cadastrar o Administrador"});
    }
        return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({message: "Inputs Inválidos"});
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if (!existingAdmin) {
        return res.status(400).json({message: "Administrador não encontrado"});
    }
    // usa o bcrypt para comparar a senha inserida com a senha do admin encontrado
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Senha incorreta"});
    }
    
    // cria o token de autenticação com o id do admin e a chave secreta do .env com validade de 1 dia
    const token = jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY, {expiresIn: "1d"});
    
    return res
        .status(200)
        .json({message: "Autenticação bem sucedida", token, id: existingAdmin._id});
};

// função de pegar todos os administradores cadastrados
export const getAdmins = async (req, res, next) => {
    let admins;
    try {
        admins = await Admin.find();
    } catch (err) {
        return console.log(err);
    }
    if (!admins) {
        return res.status(500).json({message: "Erro interno do servidor"});
    }
    return res.status(200).json({admins});
};

// função de pegar administrador pelo id
export const getAdminById = async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try {
        admin = await Admin.findById(id)
    } catch (err) {
        return console.log(err);
    }
    if (!admin) {
        return console.log("Administrador não encontrado");
    }
    return res.status(200).json({admin});
};

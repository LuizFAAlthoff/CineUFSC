import axios from "axios";

/* Importa os filmes cadastrados no banco de dados */
export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

/* Autentica e cadastra usuários no backend */
export const sendUserAuthRequest = async(data,signup)=>{
  const res = await axios.post(`/user/${signup ? "signup" : "login"}`,{
    name: signup ? data.name : "",
    email: data.email,
    password: data.password
  })
  .catch((err) => console.log(err));

  if(res.status!==200 && res.status!==201){
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;

};

// Autentica admin
export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
};

// Busca detalhes do filme
export const getMoviesDetails = async(id) => {

  const res = await axios.get(`movie/${id}`).catch(err=> console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
}

// Agenda filmes
export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userID"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

// Exporta agendamentos de filmes feitos por um usuário

export const getUserBooking = async () => {
  const id = localStorage.getItem("userID");
  const res = await axios.get(`/user/bookings/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;

};

// Apaga reserva de filme

export const deleteBooking = async (id) => {

  const res = await axios.delete(`/booking/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

//Busca informações do usuário pelo ID dele

export const getUserDetails = async () => {

  const id = localStorage.getItem("userID");

  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

//Adiciona filme

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

// Busca informações do admin pelo ID

export const getAdminById = async () =>{
  const adminID = localStorage.getItem("adminID");
  const res = await axios.get(`/admin/${adminID}`).catch(err=>console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;

};

// Deleta filme

export const deleteMovie = async (id) => {

  const res = await axios.delete(`/movie/${id}`,{        
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
  
};
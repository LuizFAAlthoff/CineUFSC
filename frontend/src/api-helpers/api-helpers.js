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

// Agente filme
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
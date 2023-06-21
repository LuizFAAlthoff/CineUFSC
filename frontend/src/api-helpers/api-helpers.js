import axios from "axios";

export const getAllMovies = async() => {
  const res = axios
  .get("http://localhost:5000/movie")
  .catch((err) => console.log(err));

  if(res.status!== 200){
    return console.log("Sem Dados");
  }

  const data = await res.data;
  return data;

};

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios
      .post(`/user/${signup ? "signup" : "login"}`, {
        name: signup ? data.name : "",
        email: data.email,
        password: data.password,
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 200 && res.status !== 201) {
      console.log("Unexpected Error Occurred");
    }
  
    const resData = await res.data;
    return resData;
  };
  
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
import axios from "axios";

const apiFilmes = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        language: 'pt-BR'
    },
    headers: {
        Authorization: 'Bearer ' 
    }
})

export default apiFilmes

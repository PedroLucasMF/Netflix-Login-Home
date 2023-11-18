import axios from "axios";

const apiFilmes = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        language: 'pt-BR'
    },
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmQ0N2EyZDhhOTZhNTQ4MjNhMTY5MjU5YmZlODcxZiIsInN1YiI6IjY1NTZhNTY3YjU0MDAyMTRjZjM4YzNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B9lr3NuqrgDUs8QZj9NHLZoPUFHkCflT5hp_YZqU9sE' 
    }
})

export default apiFilmes
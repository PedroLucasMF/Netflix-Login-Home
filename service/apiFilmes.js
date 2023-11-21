import axios from "axios";

const apiFilmes = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        language: 'pt-BR'
    },
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmVjNTNjNDJjZDhjNmVjMzVkMDE4NzgzOTAxOWZhMCIsInN1YiI6IjY0ZWZjNThjNzJjMTNlMDBmZmZmNDc3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tQUsV4QE998idbZAiiRXmoGuYK5JRO12goQ_TlCYFVM' 
    }
})

export default apiFilmes

// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    // A URL base da sua API Spring Boot
    baseURL: 'http://localhost:8080/api', 
});

export default api;
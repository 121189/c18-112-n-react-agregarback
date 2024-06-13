import axios from "axios";
import { set } from "react-hook-form";

//Obtener usuario por id
export function findUser(id,page) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/user/${id}/${page}`,{},{ withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//Seguir a un usuario
export function followUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/user/${id}/follow`, {}, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//Dejar de seguir a un usuario
export function unfollowUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/user/${id}/follow`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//Funcion para agregar a favoritos una receta
export function addFavorite(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/recipe/${id}/favorite`, {}, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

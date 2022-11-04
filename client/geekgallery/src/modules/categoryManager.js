import { getToken } from "./authManager"

const api = "/api/category"

export default function getAllCategories() {
    return getToken().then((token) => {
        return fetch(`${api}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json())
    })
}
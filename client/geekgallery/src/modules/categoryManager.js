const api = "/api/category"

export default function getAllCategories() {
    return fetch(`${api}`).then(res => res.json())
}
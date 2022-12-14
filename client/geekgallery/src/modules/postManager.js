import { getToken } from "./authManager"

export const getAllPosts = () => {
    return getToken().then((token) => {
        return fetch(`/api/Post`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(resp => resp.json())
    })
}

export const getFirst10MostRecentPosts = () => {

}

export const getCurrentUsersPosts = (userId) => {
    return getToken().then((token) => {
        return fetch(`/api/Post/myposts?UserId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(resp => resp.json())
    })
}

export function getById(id) {
    return getToken().then((token) => {
        return fetch(`/api/Post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json())
    })
}

export function getPostComments(id) {
    return getToken().then((token) => {
        return fetch(`/api/Comment/${id}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
    })
}

export function addPost(post) {
    return getToken().then((token) => {
        return fetch(`/api/Post`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
    })
}

export function deletePost(id) {
    return getToken().then((token) => {
        return fetch(`/api/Post/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export function updatePost(post) {
    return getToken().then((token) => {
        return fetch(`/api/Post/${post.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
    })
}

export function addComment(comment) {
    return getToken().then((token) => {
        return fetch(`/api/Comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
    })
}

export function deleteComment(id) {
    return getToken().then((token) => {
        return fetch(`/api/Comment/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export function updateComment(comment) {
    return getToken().then((token) => {
        return fetch(`/api/Comment/${comment.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
    })
}
import { deletePost, getAllPosts, getById } from "../modules/postManager";
import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

export function DeletePost() {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getById(id).then((post) => setPost(post))
    }, [])

    const deleteCurrentPost = (postId) => {
        deletePost(postId)
        navigate("/gallery")
    }

    return (<>
        <h2>{post.title}</h2>
        <p>Are you sure you want to delete {post.title}?</p>
        <button onClick={() => deleteCurrentPost(id)} outline className="deleteButton">DELETE</button>
    </>)
}
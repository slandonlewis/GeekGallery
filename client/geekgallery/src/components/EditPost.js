import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getById, updatePost } from "../modules/postManager";
import getAllCategories from "../modules/categoryManager";
import { DeletePost } from "./DeletePost";

export default function EditPost() {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [categories, setCategories] = useState([])
    const [previousTitle, setTitle] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const submit = () => {
        if (post.title === "") {
            setError('Please enter a title.')
        }
        else if (post.caption === "") {
            setError('Please enter a caption.')
        } else if (post.category === "") {
            setError('Please select a category.')
        } else if (post.privacy === null) {
            setError('Please select a privacy setting.')
        }
        else {
            updatePost({ ...post }).then(() => navigate(`/gallery`))
        }
    }

    useEffect(() => {
        getById(id).then((post) => {
            setPost(post)
            setTitle(post.title)
        })
        getAllCategories().then((resp) => {
            setCategories(resp)
        })
    }, [])

    return (<>
        <Form className="EditForm">
            <h2>Edit "{previousTitle}"</h2>
            <Label>Title: </Label>
            <Input id="titleEl" type="text" placeholder="Enter Title"
                value={post?.title}
                onChange={
                    (evt) => {
                        const copy = { ...post }
                        copy.title = evt.target.value
                        setPost(copy)
                    }
                }></Input>
            <Label>Caption: </Label>
            <textarea id="captionField" rows={4} cols={50} value={post?.caption}
                onChange={
                    (evt) => {
                        const copy = { ...post }
                        copy.caption = evt.target.value
                        setPost(copy)
                    }
                }></textarea>
            <Label>Category: </Label>
            <select id="categoryEl" name="categoryEl"
                onChange={
                    (evt) => {
                        const copy = { ...post }
                        copy.category = evt.target.value
                        setPost(copy)
                    }}>
                <option value="">Select a Category...</option>
                {categories.map(category => <option value={category.id}>{category.name}</option>)}
            </select>
            <Label>Privacy: </Label>
            <select id="privacyEl" name="privacyEl"
                onChange={
                    (evt) => {
                        const copy = { ...post }
                        let privacySetting = evt.target.value
                        console.log(privacySetting)
                        if (privacySetting === "public") {
                            copy.isPublic = true
                        } else {
                            copy.isPublic = false
                        }
                        console.log(copy.isPublic)
                        setPost(copy)
                    }
                }>
                <option value="">Select Setting...</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <div style={{ "color": "red" }}><label>{error}</label></div>
            <Button onClick={submit} style={{ "width": "70px", "height": "30px" }}><b>SUBMIT</b></Button>
            <Link to={`/post/delete/${post.id}`}>
                <Button style={{ "width": "70px", "height": "30px" }}><b>DELETE</b></Button>
            </Link>
        </Form>
    </>)
}
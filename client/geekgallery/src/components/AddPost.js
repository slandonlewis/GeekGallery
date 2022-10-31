import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addPost } from "../modules/postManager";
import getAllCategories from "../modules/categoryManager";
import { getUser } from "../modules/userProfileManager";

export default function AddPost() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [post, setPost] = useState({
        title: "",
        caption: "",
        category: "",
        imageURL: "",
        isPublic: null
    })

    useEffect(() => {
        getUser().then((user) => setCurrentUser(user))
    }, [])

    const submit = () => {
        const postToSendToApi = {
            userId: currentUser.id,
            title: post.title,
            caption: post.caption,
            category: post.category,
            imageURL: post.imageURL,
            privacy: post.isPublic
        }

        if (post.title === "") {
            setError('Please enter a title.')
        }
        else if (post.caption === "") {
            setError('Please enter a caption.')
        }
        else if (post.category === "") {
            setError('Please select a category.')
        }
        else if (post.imageURL === "") {
            setError('Please provide an image.')
        }
        else if (post.isPublic === null) {
            setError('Please select privacy setting.')
        }
        else {
            console.log(postToSendToApi)
            addPost(postToSendToApi).then(() => navigate(`/gallery`))
        }
    }

    useEffect(() => {
        getAllCategories().then((resp) => {
            setCategories(resp)
        })
    }, [])

    return (<>
        <Form className="EditForm">
            <h2>Create New Post</h2>
            <Label>Title: </Label>
            <Input id="titleEl" type="text" placeholder="Enter Title"
                onChange={
                    (evt) => {
                        const copy = { ...post }
                        copy.title = evt.target.value
                        setPost(copy)
                    }
                }></Input>
            <Label>Image File: </Label>
            <Input id="imageEl" type="text" placeholder="Enter Image URL"
                onChange={
                    (evt) => {
                        const copy = { ...post }
                        copy.imageURL = evt.target.value
                        setPost(copy)
                    }}></Input>
            <Label>Caption: </Label>
            <textarea id="captionField" rows={4} cols={50} placeholder="Brief description of your artwork..."
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
                        if (privacySetting === "public") {
                            copy.isPublic = true
                        } else {
                            copy.isPublic = false
                        }
                        setPost(copy)
                    }
                }>
                <option value="">Select Setting...</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <div style={{ "color": "red" }}><label>{error}</label></div>
            <Button onClick={submit} style={{ "width": "70px", "height": "30px" }}><b>SUBMIT</b></Button>
        </Form>
    </>)
}
import { addComment, getAllPosts, getById } from "../modules/postManager";
import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

export default function CommentForm() {
    // const navigate = useNavigate()
    // const { id } = useParams()
    // const [error, setError] = useState('')

    // const submit = () => {
    //     let subject = document.querySelector("#subjectTb").value
    //     let content = document.querySelector("#contentTb").value

    //     if (subject === "") {
    //         setError('Please enter a subject.')
    //         console.log(id);
    //     }
    //     else if (content === "") {
    //         setError('Please enter your comment.')
    //     }
    //     else {
    //         let newComment = {}
    //         newComment.content = content;
    //         newComment.subject = subject;
    //         newComment.postId = id;
    //         console.log(newComment)
    //         addComment(newComment).then(() => navigate(`/post/comments/${id}`))
    //     }
    // }

    return (<>
        {/* <div>
            <Input placeholder="Subject eg: Pets" id="subjectTb" style={{ "width": "300px" }} type="text"></Input>
            <Input placeholder="Content eg: I Love Dogs!!" id="contentTb" style={{ "width": "300px" }} type="text"></Input>
            <Button onClick={submit} style={{ "width": "300px" }} type="submit">Submit</Button>
            <div style={{ "color": "red" }}><label>{error}</label></div>
        </div> */}
        <h1>Comment Form</h1>
    </>)
}


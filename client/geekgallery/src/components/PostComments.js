import { getPostComments } from "../modules/postManager";
import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

export default function PostComments() {
    // const {id} = useParams()
    // const [comments, setComments] = useState([])
    // const navigate = useNavigate();

    // useEffect(() => {
    //     getPostComments(id).then((commentsList) => setComments(commentsList))
    // },[])


    return (<>
        {/* <Button onClick={() => {navigate(`/post/details/${id}`)}}>Back to Post</Button>
    <h3>Comments</h3>
    <table>
        <tr key={"TOP"}>
            <td><b>User</b></td>
            <td><b>Subject</b></td>
            <td><b>Date Created</b></td>
            <td><b>Content:</b></td>
        </tr>
        {comments.map((comment) => 
            (<>
            <tr key={comment.id}>
                <td>{comment.userProfile.displayName}</td>
                <td>{comment.subject}</td>
                <td>{comment.createDateTime}</td>
                <td>{comment.content}</td>
            </tr>
            </>)
        )}
    </table> */}
        <h1>Comments</h1>
    </>)
}
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addComment, getById, getPostComments, deleteComment } from "../modules/postManager";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../index.css'
import { getUser } from "../modules/userProfileManager";
import ggdeleteicon from "./ggdeleteicon.png";
import ggediticon from "./ggediticon.png";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';

export default function ViewPost() {
    const { id } = useParams()
    const [currentPost, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState('')
    const urlEndpoint = "https://ik.imagekit.io/jispgtxyu";
    const publicKey = 'public_uMLss766YJYyVVpuCOUgRukV7/E=';
    const authenticationEndpoint = 'http://localhost:3001/auth';
    const [myComment, setMyComment] = useState({
        content: "",
        userId: currentUser.id,
        postId: currentPost.id,
        profile: currentUser,
        post: currentPost
    })

    useEffect(() => {
        getUser().then((user) => setCurrentUser(user))
    }, [])

    useEffect(() => {
        getById(id).then((post) => setPost(post))
    }, [])

    useEffect(() => {
        getPostComments(id).then((commentsList) => setComments(commentsList))
    }, [])

    const submitComment = () => {
        const commentToSendToApi = {
            content: myComment.content,
            userId: currentUser.id,
            postId: currentPost.id,
            profile: currentUser,
            post: currentPost
        }

        if (myComment.content === "") {
            setError('Please enter a comment.')
        }
        else {
            console.log(commentToSendToApi)
            addComment(commentToSendToApi).then(() => getPostComments(id).then((commentsList) => setComments(commentsList)))
        }
    }

    const deleteThisComment = (commentId) => {
        deleteComment(commentId)
            .then(() => {
                getPostComments(id)
                    .then((commentsList) => setComments(commentsList))
            })
    }

    return (<>
        <div className="PostDisplay">
            <div className="PostView">
                <h2>{currentPost.title}</h2>
                <p>by {currentPost?.userProfile?.name}</p>
                {/* <img className="ImageView" src={currentPost.imageURL}></img> */}
                <IKImage urlEndpoint={urlEndpoint}
                    path={currentPost.imageURL}
                    className="ImageView" /><br></br>
                <p>{currentPost.caption}</p>
                <p>{currentPost.creationDate}</p>
            </div>

            <div>
                <div className="CommentSection">
                    <p><u>Feedback</u></p>
                    {comments.map((comment) =>
                    (<>
                        <div className="CommentCard">
                            <img className="profileImage" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" height={50} width={50}></img>
                            <p><b>{comment.profile.name}: </b></p>
                            <p>{comment.content}</p>
                            {/* {currentUser.id === comment.userId ?
                                <img className="icons" src={ggediticon} height={30}></img>
                                : <p></p>
                            } */}
                            {currentUser.id === comment.userId ?
                                <img onClick={() => { deleteThisComment(comment.id) }} className="icons" src={ggdeleteicon} height={30}></img>
                                : <p></p>
                            }
                        </div>
                    </>)
                    )}
                </div>

                <div className="CommentField">
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" height={50} width={50}></img>
                    <p>{currentUser.name}</p>
                    <Input
                        className="input"
                        id="mycomment"
                        type="text"
                        size={70}
                        placeholder="Enter your comment here..."
                        onChange={
                            (evt) => {
                                const copy = { ...myComment }
                                copy.content = evt.target.value
                                setMyComment(copy)
                            }}
                    />
                    <div style={{ "color": "red" }}><label>{error}</label></div>
                    <Button onClick={submitComment} style={{ "width": "70px", "height": "30px" }}>POST</Button>
                </div>
            </div>
        </div>
    </>)
}
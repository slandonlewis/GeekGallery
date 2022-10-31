import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById, getPostComments } from "../modules/postManager";

export default function ViewPost() {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        getById(id).then((post) => setPost(post))
    }, [])

    useEffect(() => {
        getPostComments(id).then((commentsList) => setComments(commentsList))
    }, [])

    return (<>
        <div className="PostDisplay">
            <div className="PostView">
                <h2>{post.title}</h2>
                <h3>by {post?.userProfile?.name}</h3>
                <img src={post.imageURL}></img>
                <p>{post.caption}</p>
                <p>{post.creationDate}</p>
            </div>
            <div className="CommentSection">
                <h3><u>Feedback</u></h3>
                {comments.map((comment) =>
                (<>
                    <div className="CommentCard">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" height={50} width={50}></img>
                        <p><b>{comment.profile.name}: </b></p>
                        <p>{comment.content}</p>
                    </div>
                </>)
                )}
            </div>
        </div>
    </>)
}
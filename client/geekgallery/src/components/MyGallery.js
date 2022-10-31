import React, { useState, useEffect } from "react";
import { getCurrentUsersPosts } from "../modules/postManager";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { getUser } from "../modules/userProfileManager";

export default function MyGallery() {
    const [currentUser, setCurrentUser] = useState({})
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getUser().then((user) => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (currentUser.id == null) {
            console.log('Getting posts...')
        } else {
            getCurrentUsersPosts(currentUser.id).then((posts) => setPosts(posts))
        }
    }, [currentUser])


    if (posts.length < 1) {
        return (<>
            <p>Nothing Posted Yet...</p>
        </>)
    }
    return (<>
        <h2>{currentUser.name}'s Gallery</h2>
        <div className="postList">
            {posts.map((post) =>
                <div className="PostCard" key={post.id}>
                    <h3>{post.title}</h3>
                    <img src={post.imageURL} height={250} width={400}></img><br></br>
                    <Link to={`/post/details/${post.id}`}><button>View</button></Link>
                    <Link to={`/post/edit/${post.id}`}><button>Edit</button></Link>
                </div>)}
        </div>
    </>)
}
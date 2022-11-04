import React, { useState, useEffect } from "react";
import { getUser } from "../modules/userProfileManager";
import { useNavigate, Link } from "react-router-dom";
import { getAllPosts } from "../modules/postManager";
import './slider.css'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';


function Home() {
    const [currentUser, setCurrentUser] = useState({})
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const urlEndpoint = "https://ik.imagekit.io/jispgtxyu";
    const publicKey = 'public_uMLss766YJYyVVpuCOUgRukV7/E=';
    const authenticationEndpoint = 'http://localhost:3001/auth';
    useEffect(() => {
        // needs to get current user's id and pass it, just used an integer to test the view
        getAllPosts()
            .then((posts) => setPosts(posts.reverse().slice(0, 5)))
    }, [])

    useEffect(() => {
        getUser().then((user) => setCurrentUser(user))
    }, [])

    if (currentUser.id == null) {
        return (
            <h2>Logging In...</h2>
        )
    } else {
        return (
            <>
                <h1>Welcome, {currentUser.name}!</h1>
                <div className="container">
                    <h2>RECENT UPLOADS</h2>
                    <div className="wrapper">
                        {posts.map((post) =>
                            <div className="PostCard" key={post.id}>
                                <h3>{post.title} by {post.userProfile.name}</h3>
                                <Link to={`/post/details/${post.id}`}>
                                    <IKImage urlEndpoint={urlEndpoint}
                                        path={post.imageURL}
                                        transformation={[{
                                            height: 400,
                                            width: 600
                                        }]} />

                                </Link>
                            </div>)}
                    </div>
                </div>
            </>
        )
    }
}

export default Home
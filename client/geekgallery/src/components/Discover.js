import { getAllPosts } from "../modules/postManager";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';

export default function Discover() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const urlEndpoint = "https://ik.imagekit.io/jispgtxyu";
    const publicKey = 'public_uMLss766YJYyVVpuCOUgRukV7/E=';
    const authenticationEndpoint = 'http://localhost:3001/auth';
    useEffect(() => {
        // needs to get current user's id and pass it, just used an integer to test the view
        getAllPosts().then((posts) => setPosts(posts))
    }, [])

    if (posts.length < 1) {
        return (<>
            <p>Nothing Posted Yet...</p>
        </>)
    }
    return (<>
        <h2>DISCOVER</h2>
        <div className="postList">
            {posts.map((post) =>
                <div className="PostCard" key={post.id}>
                    <h3>{post.title}</h3>
                    <IKImage urlEndpoint={urlEndpoint}
                        path={post.imageURL}
                        transformation={[{
                            height: 250,
                            width: 400
                        }]} /><br></br>
                    <Link to={`/post/details/${post.id}`}><button>View</button></Link>
                </div>)}
        </div>
    </>)
}
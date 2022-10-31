import { getAllPosts } from "../modules/postManager";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Discover() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
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
        <h2>Recent Posts</h2>
        <div className="postList">
            {posts.map((post) =>
                <div className="PostCard" key={post.id}>
                    <h3>{post.title}</h3>
                    <img src={post.imageURL} height={250} width={400}></img><br></br>
                    <Link to={`/post/details/${post.id}`}><button>View</button></Link>
                </div>)}
        </div>
    </>)
}
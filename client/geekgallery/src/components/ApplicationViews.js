import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ViewPost from "./ViewPost";
import MyGallery from "./MyGallery";
import EditPost from "./EditPost";
import Discover from "./Discover";
import { DeletePost } from "./DeletePost";
import AddPost from "./AddPost";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route index element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="discover" element={<Discover />} />
                    <Route path="gallery" element={<MyGallery />} />
                    <Route path="post">
                        <Route path="details">
                            <Route path=":id" element={<ViewPost />}></Route>
                        </Route>
                        <Route path="edit">
                            <Route path=":id" element={<EditPost />}></Route>
                        </Route>
                        <Route path="delete">
                            <Route path=":id" element={<DeletePost />}></Route>
                        </Route>
                    </Route>
                    <Route path="create" element={<AddPost />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};
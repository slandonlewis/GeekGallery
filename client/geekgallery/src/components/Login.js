import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "../login.css";
import GGAvatar from './GGAvatar.png'

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    const linkStyle = {
        textDecoration: "none",
        color: "white"
    };

    return (
        <Form className="LoginPanel" onSubmit={loginSubmit}>
            <h1>GeekGallery</h1>
            <img src={GGAvatar} height={250}></img>
            <h2>~Let Your Inner Geek Shine~</h2>
            <fieldset>
                <FormGroup>
                    <em>Email: </em>
                    <Input
                        placeholder="Email"
                        id="email"
                        type="text"
                        autoFocus
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <em>Password: </em>
                    <Input
                        placeholder="Password"
                        id="password"
                        type="password"
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <button className="LoginButton">Sign In</button>
                </FormGroup>
                <em>
                    Not a member? <Link style={linkStyle} to="/register">Join</Link> the Geek Community!
                </em>
            </fieldset>
        </Form >
    );
}
import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";
import "./register.css";

export default function Register() {
    const navigate = useNavigate();

    const [name, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                name,
                email
            };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <h1>SIGN UP</h1>
                <FormGroup>
                    <Label htmlFor="displayName">Display Name: </Label>
                    <Input
                        className="input"
                        id="displayName"
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email: </Label>
                    <Input
                        className="input"
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password: </Label>
                    <Input
                        className="input"
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password: </Label>
                    <Input
                        className="input"
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
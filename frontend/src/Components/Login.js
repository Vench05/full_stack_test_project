import React, { useState, useContext } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context'
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isWarning, setIsWarning] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    async function submitFormData(e) {
        e.preventDefault();
        if (username === '' && password === ''){
            alert('username and password required')
            return;
        }
        await axios.post('http://localhost:8000/user/login', {'username': username, 'password': password})
            .then(res => {
                setUser(res.data)
                navigate('/step')

                localStorage.setItem('username', res.data.username)
            })
            .catch(err => setIsWarning(true))
        
    }

    return (
        <Card style={{ margin: 100, width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                { !isWarning? <></> :
                <Alert className='text-center' variant='warning'>
                    Invalid Username or Password
                </Alert>
                }   
                <Form onSubmit={submitFormData}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            defaultValue={username}
                            type="text"
                            placeholder="Username"
                            onChange={e=>setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            defaultValue={password}
                            type="password"
                            placeholder="Password"
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                
                    <div className="d-grid gap-2">
                        <Button className="d-grid gap-2" variant="primary" type="submit">
                            Login
                        </Button>

                        <p className='text-center'>
                            New User? <Link to={'/register'}> Register </Link> Now
                        </p>
                    </div>
                </Form>
                
            </Card.Body>
        </Card>
    )
}

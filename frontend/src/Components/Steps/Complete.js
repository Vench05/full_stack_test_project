import React from 'react'
import { Form, Card, Button } from "react-bootstrap";

export default function Complete({values, handleLogout}) {
    return (
        <Card style={{ margin: 100, width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Card.Header >
                <Button variant="danger" onClick={handleLogout} >Logout</Button>
            </Card.Header>
            <Card.Body>
                <Card.Title>Information</Card.Title>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            defaultValue={values.username}
                            type="text"
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            defaultValue={`${values.fname} ${values.lname}`}
                            type="text"
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            defaultValue={values.email}
                            type="text"
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            defaultValue={values.age}
                            type="text"
                            disabled
                        />
                    </Form.Group>
            </Card.Body>
        </Card>
    )
}

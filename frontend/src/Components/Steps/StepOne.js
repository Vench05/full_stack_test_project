import axios from 'axios';
import React from 'react'
import { Form, Card, Button } from "react-bootstrap";


export default function StepOne({ handleLogout, nextStep, handleFormData, values }) {
    const submitFormData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/user/${values.id}/update`, values)
        nextStep();
    };

    return (
        <div>
            <Card style={{ marginTop: 100 }}>
                <Card.Header >
                    <Button variant="danger" onClick={handleLogout} >Logout</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Step One</Card.Title>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                style={{ "2px solid red": "" }}
                                name="firstName"
                                defaultValue={values.fname}
                                type="text"
                                placeholder="First Name"
                                onChange={handleFormData("fname")}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                style={{ "2px solid red": "" }}
                                name="lastName"
                                defaultValue={values.lname}
                                type="text"
                                placeholder="Last Name"
                                onChange={handleFormData("lname")}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit"
                            disabled={(values.fname && values.lname)?false:true}>
                            Next
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

import axios from 'axios';
import React from 'react'
import { Form, Card, Button } from "react-bootstrap";

export default function StepThree({ handleLogout, prevStep, nextStep, handleFormData, values }) {
    const submitFormData = (e) => {
        e.preventDefault();
        if (isNaN(values.age)){
            alert('age must be Number')
            return;
        }
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
                    <Card.Title>Step Three</Card.Title>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                style={{ "2px solid red": "" }}
                                name="emailAddress"
                                defaultValue={values.age}
                                type="text"
                                placeholder="Age"
                                onChange={handleFormData("age")}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={prevStep} >
                            Prev
                        </Button>
                        <Button variant="primary" type="submit" disabled={values.age?false:true}>
                            Finish
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

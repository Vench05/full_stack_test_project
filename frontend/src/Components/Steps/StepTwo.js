import axios from 'axios';
import React from 'react'
import { Form, Card, Button } from "react-bootstrap";

export default function StepTwo({ prevStep, nextStep, handleFormData, values }) {
    const submitFormData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/user/${values.id}/update`, values)
        nextStep();
    };
    return (
        <div>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Card.Title>Step Two</Card.Title>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                style={{ "2px solid red": "" }}
                                name="emailAddress"
                                defaultValue={values.email}
                                type="text"
                                placeholder="Email Address"
                                onChange={handleFormData("email")}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={prevStep} >
                            Prev
                        </Button>
                        <Button variant="primary" type="submit" disabled={values.email?false:true} >
                            Next
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

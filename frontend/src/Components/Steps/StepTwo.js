import React from 'react'
import { Form, Card, Button } from "react-bootstrap";

export default function StepTwo({ nextStep, handleFormData, values }) {
    const submitFormData = (e) => {
        e.preventDefault();
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
                        style={{ "2px solid red" : "" }}
                        name="emailAddress"
                        defaultValue={values.email}
                        type="text"
                        placeholder="Email Address"
                        onChange={handleFormData("email")}
                        />
                    </Form.Group>
                <Button variant="primary" type="submit">
                    Next
                </Button>
                </Form>
            </Card.Body>
            </Card>
        </div>
    )
}

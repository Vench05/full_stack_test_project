import React from 'react'
import { Form, Card, Button } from "react-bootstrap";

export default function StepThree({ prevStep, nextStep, handleFormData, values }) {
    const submitFormData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/user/${values.id}/update`, values)
        nextStep();
    };
    return (
        <div>
            <Card style={{ marginTop: 100 }}>
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
                        <Button variant="primary" type="submit">
                            Finish
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

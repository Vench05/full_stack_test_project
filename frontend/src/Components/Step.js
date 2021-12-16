import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Col, Row, Container } from "react-bootstrap";
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import Complete from './Steps/Complete';
import { UserContext } from '../Context'
import axios from 'axios';


export default function Step() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleInputData = input => e => {
    const { value } = e.target

    setUser(prevState => ({
      ...prevState,
      [input]: value
    }));
  }

  const handleLogout = () => {
    console.log('logout');
    localStorage.clear()
    setUser({})
    navigate('/')
  };

  function determineStepNum() {
    (!user.fname || !user.lname) ? setStep(1) :
      (!user.email) ? setStep(2) :
        (!user.age) ? setStep(3) :
          setStep(4)
  }

  useEffect(async () => {
    const loggedUser = localStorage.getItem("user_id")
    if (loggedUser) {
      await axios.get(`http://localhost:8000/user/${loggedUser}`)
        .then(res => {
          setUser(res.data)
        })
    }
    if (!user.username) {
      navigate('/')
    }
    determineStepNum()
  }, [])

  switch (step) {
    case 1:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepOne prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={user} />
              </Col>
            </Row>
          </Container>
        </div>
      )

    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepTwo handleLogout={handleLogout} prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={user} />
              </Col>
            </Row>
          </Container>
        </div>
      )

    case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepThree handleLogout={handleLogout} prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={user} />
              </Col>
            </Row>
          </Container>
        </div>
      )

    default:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <Complete handleLogout={handleLogout} values={user} />
              </Col>
            </Row>
          </Container>
        </div>
      )
  }
}

import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Col, Row, Container } from "react-bootstrap";
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import { UserContext } from '../Context'

export default function Step() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const state = useLocation()

  const [step, setStep] = useState(1)
  const formData = ''
  const setFormData = ''

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleInputData = input => e => {
    const { value } = e.target;

    setUser(prevState => ({
      ...prevState,
      [input]: value
    }));
  }

  function determineStepNum() {
    (!user.fname || !user.lname) ? setStep(1) :
      (!user.email) ? setStep(2) :
        (!user.age) ? setStep(3) :
          setStep(4)
  }

  useEffect(async () => {
    const loggedUser = localStorage.getItem("user_id")
    console.log(loggedUser);
    if (loggedUser) {
      await axios.get(`http://localhost:8000/user/${loggedUser}`)
        .then(res => {
          setUser(res.data)
          navigate('/step')
        })
    }
  }, [])

  useEffect(() => {
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
                <StepTwo prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={user} />
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
                <StepThree prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      )

    default:
      break
  }
}

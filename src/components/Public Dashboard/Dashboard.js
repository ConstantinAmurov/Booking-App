import React from "react";
import styles from "../../css/Public Dashboard/PublicDashboard.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GreetingIMG from "../../img/Greeting-bro.png";
import {
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";
import Search from "./Search";

const Dashboard = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Container>
          <Row className="justify-content-md-center ">
            <Col lg="3">
              <div className={styles.top}>
                <div className={styles.logo}> B</div>
                <p className={styles.appName}>Booking.app</p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className={styles.greeting}>
          <Row className="align-middle">
            <Col lg="6">
              <div>
                <h1>Book Services as Easy as One Click</h1>
                <p>
                  Welcome to Booking.app the web based app that make your live
                  much easier{" "}
                </p>
                <button>Book Now</button>
              </div>
            </Col>
            <Col lg="6">
              <img className={styles.greetingImg} src={GreetingIMG}></img>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-md-center">
            <Col lg="6">
              <div className={styles.steps}>
                <h3>Simple and easy steps to booking</h3>
                <p>
                  A few simple steps to booking a service, see how easy to
                  booking{" "}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className={styles.specificStepsWrapper} lg="12">
              <div className={styles.specificSteps}>
                <div className={styles.step}>
                  <FiMapPin></FiMapPin>
                </div>
                <div className={styles.step}>
                  <FiBriefcase></FiBriefcase>
                </div>
                <div className={styles.step}>
                  <FiCalendar></FiCalendar>
                </div>
                <div className={styles.step}>
                  <FiCheckCircle></FiCheckCircle>
                </div>
              </div>
              <hr className={styles.customHr}></hr>
              <div className={styles.stepsDescription}>
                <div>
                  <h1>Choose Company</h1>
                  <p>Amet quisque eleifend justo, duis</p>
                </div>
                <div>
                  <h1>Select service</h1>
                  <p>Lectus nisi suspendisse sit euismod</p>
                </div>

                <div>
                  <h1>Select the date</h1>
                  <p>Consequat lacinia molestie nisl sit</p>
                </div>
                <div>
                  <h1>Book Service</h1>
                  <p>Dignissim sit malesuada ut lectus</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className={styles.booking}>
          <Row className="justify-content-md-center text-center">
            <Col lg="12">
              <div>
                <h1>Company List</h1>
                <p>Let’ s book a service from our company list </p>
              </div>
            </Col>
          </Row>
          <Search></Search>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

import axios from "axios";
import HeadlessLayout from "components/layouts/HeadlessLayout";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Counter = () => {
  // 디테일 페이지
  // `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=aqYbjZWC897%2Bma8VVCR5DEJ75apSAVxRP9ILxPRQCeAJU8MP6MxwZK3tTrZDKhEmhCrqzjfC4OeR9pfFlzmhsw%3D%3D&numOfRows=9&pageNo=1&resultType=json&UC_SEQ=${seq}`
  // pathVariable
  const { seq } = useParams();

  const navigate = useNavigate();

  const [details, setDetails] = useState([null]);

  const getAttrsDetails = () => {
    axios
      .get(
        `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=aqYbjZWC897%2Bma8VVCR5DEJ75apSAVxRP9ILxPRQCeAJU8MP6MxwZK3tTrZDKhEmhCrqzjfC4OeR9pfFlzmhsw%3D%3D&numOfRows=9&pageNo=1&resultType=json&UC_SEQ=${seq}`
      )
      .then((response) => {
        console.log(response.data.getAttractionKr.item[0]);
        setDetails(response.data.getAttractionKr.item[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  };

  useEffect(() => {
    getAttrsDetails();
  }, []);

  return (
    <HeadlessLayout>
      <Container className="border border-dark">
        <h1 style={{ color: "blue" }}>상세보기</h1>
        <Row>
          <Card>
            <Card.Img
              className="mt-3"
              variant="top"
              src={details.MAIN_IMG_NORMAL}
            />
            <Card.Body>
              <Card.Text>{details.ITEMCNTNTS}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <hr></hr>
        <Row className="mb-3 text-primary">
          <Col>주소 : {details.ADDR1}</Col>
          <Col className="mb-3 text-primary">
            전화번호 : {details.CNTCT_TEL}
          </Col>
          <Col className="mb-3 text-primary">비용 : {details.USAGE_AMOUNT}</Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>오시는 길☛ {details.TRFC_INFO}</Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Button
              variant="info"
              onClick={() => window.open(details.HOMEPAGE_URL, "_blank")}
            >
              홈페이지 바로가기
            </Button>
          </Col>
          <Col>

            <Button
              className="mb-3"
              variant="primary"
              onClick={() => navigate("/")}
            >
              돌아가기
            </Button>
          </Col>
        </Row>
      </Container>
    </HeadlessLayout>
  );
};

export default Counter;

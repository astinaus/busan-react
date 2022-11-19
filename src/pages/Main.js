import axios from "axios";
import HeadLayout from "components/layouts/HeadLayout";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "react-bootstrap";
import TextEllipsis from "react-text-ellipsis";

const Main = () => {
  // 공공데이터를 리스트로 출력
  const navigate = useNavigate();

  const [attrs, setAttrs] = useState([]);

  // QueryString
  const { search } = useLocation();
  // const queryString = useMemo(() => new URLSearchParams(search), [search]);

  const getPageNo = useMemo(() => {
    const queryString = new URLSearchParams(search);
    let pageNo = "1";
    if (
      queryString.get("pageNo") != null &&
      !isNaN(queryString.get("pageNo"))
    ) {
      pageNo = queryString.get("pageNo");
    }
    return pageNo;
  }, [search]);

  const getAttrs = () => {
    axios
      .get(
        `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=aqYbjZWC897%2Bma8VVCR5DEJ75apSAVxRP9ILxPRQCeAJU8MP6MxwZK3tTrZDKhEmhCrqzjfC4OeR9pfFlzmhsw%3D%3D&numOfRows=12&pageNo=${getPageNo}&resultType=json`
      )
      .then((response) => {
        // console.log(response.data.getAttractionKr.item);
        setAttrs(response.data.getAttractionKr.item);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAttrs();
  }, [getPageNo]);

  return (
    <HeadLayout>
      <div>메인페이지</div>
      <Container>
        <Row>
          <Col>
            <Button
              className="me-3"
              variant="dark"
              onClick={() => navigate(`/?pageNo=${parseInt(getPageNo) - 1}`)}
            >
              이전
            </Button>
            <Button
              variant="dark"
              onClick={() => navigate(`/?pageNo=${parseInt(getPageNo) + 1}`)}
            >
              다음
            </Button>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
          {attrs.map((value, index) => {
            return (
              <Col key={index}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={value.MAIN_IMG_THUMB} />
                  <Card.Body>
                    <Card.Title>{value.MAIN_TITLE}</Card.Title>
                    <hr></hr>
                    <Card.Text style={{ height: "155px", overflow: "hidden" }}>
                      <div>{value.TITLE}</div>
                      <hr></hr>
                      <TextEllipsis
                        lines={4}
                        tag={"p"}
                        ellipsisChars={"..."}
                        tagClass={"className"}
                        debounceTimeoutOnResize={200}
                        useJsOnly={true}
                      >
                        {value.ITEMCNTNTS}
                      </TextEllipsis>
                    </Card.Text>
                    <hr></hr>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/counter/${value.UC_SEQ}`)}
                    >
                      자세히보기
                    </Button>
                    
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <button onClick={() => navigate("/Counter")}>카운터로 이동</button>
    </HeadLayout>
  );
};

export default Main;

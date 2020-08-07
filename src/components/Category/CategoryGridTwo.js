import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from 'next/router';

const CategoryGridTwo = ({ spaceBottomClass, categoryData }) => {
  const router = useRouter();
  return (
    <div
      className={`product-category-container ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <Container className="wide">
        <Row>
          {categoryData.map((category, index) => {
            // const data = category["_id"];
            console.log("Category Id is", category._id);
             console.log("The data here is", category, index);
            return (
             <Col lg={3} md={6} >
             <div className="single-category single-category--one space-mb--100">
             <Card>
              <Card.Header>{category.categoryName}</Card.Header>
              <Card.Body>
            <Card.Title>Product Count : {category.productCount}</Card.Title>
                <Card.Text>
                  {category.description}
                </Card.Text>
                <Button size="small" variant="primary" onClick={(e) => {
                  e.preventDefault();
                  let string = window.location.origin + `/shop/no-sidebar/${category._id}`;
                  window.open(string, "_self");
                }}>Explore Products</Button>
              </Card.Body>
            </Card>
             </div>
           </Col>
            )
          })}
          {/* <Col lg={3} md={6}>
            <div className="single-category single-category--one">
              <div className="single-category__image single-category__image--one">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/category/category-women.jpg"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="single-category__content single-category__content--one space-mt--25 space-mb--25">
                <div className="title">
                  <p>Women</p>
                  <Link
                    href="/shop/left-sidebar"
                    as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                  >
                    <a>+ Online store</a>
                  </Link>
                </div>
                <p className="product-count">999</p>
              </div>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <div className="single-category single-category--one">
              <div className="single-category__content single-category__content--one space-mt--25 space-mb--25">
                <div className="title">
                  <p>Shoes</p>
                  <Link
                    href="/shop/left-sidebar"
                    as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                  >
                    <a>+ Online store</a>
                  </Link>
                </div>
                <p className="product-count">222</p>
              </div>

              <div className="single-category__image single-category__image--one">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/category/category-shoes.jpg"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>

              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <div className="single-category single-category--one">
              <div className="single-category__image single-category__image--one">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/category/category-bags.jpg"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="single-category__content single-category__content--one space-mt--25 space-mb--25">
                <div className="title">
                  <p>Bags</p>
                  <Link
                    href="/shop/left-sidebar"
                    as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                  >
                    <a>+ Online store</a>
                  </Link>
                </div>
                <p className="product-count">4</p>
              </div>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <div className="single-category single-category--one">
              <div className="single-category__content single-category__content--one space-mt--25 space-mb--25">
                <div className="title">
                  <p>Men</p>
                  <Link
                    href="/shop/left-sidebar"
                    as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                  >
                    <a>+ Online store</a>
                  </Link>
                </div>
                <p className="product-count">4</p>
              </div>

              <div className="single-category__image single-category__image--one">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/category/category-men.jpg"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>

              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default CategoryGridTwo;

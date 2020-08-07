import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import { LayoutTwo } from "../../../components/Layout";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import { getSortedProducts } from "../../../lib/product";
import { ShopProducts } from "../../../components/Shop";
import products from "../../../data/products.json";
import { useRouter } from 'next/router';

const NoSidebar = () => {
  const router = useRouter();
  const [layout, setLayout] = useState("grid four-column");
  const   { id } = router.query;
  const [ productData , setProductData] = useState([]);
  const [category, setcategory] = useState("");

  useEffect(() => {
    async function getProduct (){
      await fetch (
       `http://localhost:4000/supplierProductbyId?id=${id}`,
       {
         method: 'GET',
         headers: new Headers({
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*"
         })
       }).then(r => r.json())
       .then(r => {
         console.log("Response is", r.data[0]);
         setProductData(r.data[0])
         setcategory(r.data[0][0].categoryName);
        })
         
       .catch(err =>{
         console.log(err);
       }
     )
   }
   getProduct();
   console.log("Product List is", productData);
  }, []);

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle={"Product List of : " +category}
        backgroundImage="/assets/images/backgrounds/cartbg.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>Product in Category : {category}</li>
        </ul>
      </BreadcrumbOne>
      <div className="shop-page-content">
        {/* shop page header */}

        {/* shop page body */}
        <div className="shop-page-content__body space-mt--r130 space-mb--r130">
          <Container>
            <Row>
              <Col>
                {/* shop products */}
                <ShopProducts layout={layout} products={productData} />

                {/* shop product pagination */}
                {/* <div className="pro-pagination-style">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default NoSidebar;

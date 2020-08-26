import Link from "next/link";
import { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { LayoutTwo } from "../../../components/Layout";
import { getDiscountPrice } from "../../../lib/product";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import { useRouter } from 'next/router';
import {
  ImageGalleryLeftThumb,
  ProductDescription
} from "../../../components/ProductDetails";
// import { Fragment } from "react-hooks-paginator";

const ProductFullwidth = ({
  
}) => {
  
  const router = useRouter();
  const   { slug } = router.query;
  const [ productData , setProductData] = useState([]);
  const [category, setcategory] = useState("");
  useEffect(() => {
    async function getProduct (){
      await fetch (
       `http://3.7.238.54:4000/supplierProductbyProdId?id=${slug}`,
       {
         method: 'GET',
         headers: new Headers({
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*"
         })
       }).then(r => r.json())
       .then(r => {
         console.log("Response is", r.data);
         setProductData(r.data)
         setcategory(r.data[0].categoryName);
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
               
              {/* product description */}
              {
              productData.map((product) => {
                 const discountedPrice = parseFloat(product.sellingPrice).toFixed(2);
                 const discount = (((parseFloat(product.originalPrice)-parseFloat(product.sellingPrice))/parseFloat(product.originalPrice))*100).toFixed(0);
                 const productPrice = parseFloat(product.originalPrice).toFixed(2);
                 return(
                   <Fragment>
                  <BreadcrumbOne
                  page={'slug'}
                  productName = {product.productName}
                  />
          
                {/* product details */}
                <div className="product-details space-mt--r100 space-mb--r100">
                  <Container className="wide">
                    
                  <Row>
                  <Col lg={6} className="space-mb-mobile-only--50">
                    
                    <ImageGalleryLeftThumb
                      product={product}
                      discount = {discount}
                    />
                  </Col>
      
                  <Col lg={6}>
                   <ProductDescription
                 product={product}
                 productPrice={productPrice}
                 discountedPrice={discountedPrice}
                 discount = {discount}
               />
                </Col>
          </Row>
          </Container>
      </div>
      </Fragment>
                 )
              })
            }
              
               
                
              
              
           
         
       
    </LayoutTwo>
  );
};


export default ProductFullwidth;


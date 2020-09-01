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
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setInterval(() => {
      var cartItem = [];
      cartItem = JSON.parse(localStorage.getItem("cartItem"))|| [];
      var cartSupplier = localStorage.getItem("supplierId") || "";
      var cartFinal =  cartItem.filter(cart => cart.supplierId === cartSupplier) ;
      setCartData(cartFinal);
    }, 1000);
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
         setProductData(r.data[0])
         setcategory(r.data[0].categoryName);
        })
         
       .catch(err =>{
         console.log(err);
       }
     )
   }
   getProduct();
  }, []);

  return (
    <LayoutTwo>
      {/* breadcrumb */}
               
              {/* product description */}
              
              
                 
                   <Fragment>
                  <BreadcrumbOne
                  page={'slug'}
                  productName = {productData.productName}
                  />
          
                {/* product details */}
                
                <div className="product-details space-mt--r100 space-mb--r100">
                  <Container className="wide">
                    
                  <Row>
                  <Col lg={6} className="space-mb-mobile-only--50">
                    
                    <ImageGalleryLeftThumb
                      product={productData}
                      images = {productData.imageUrl ? productData.imageUrl.split(',') : []}
                      discount = {(((parseFloat(productData.originalPrice)-parseFloat(productData.sellingPrice))/parseFloat(productData.originalPrice))*100).toFixed(0)}
                    />
                  </Col>
      
                  <Col lg={6}>
                   <ProductDescription
                 product={productData}
                 productPrice={parseFloat(productData.originalPrice).toFixed(2)}
                 discountedPrice={parseFloat(productData.sellingPrice).toFixed(2)}
                 discount = {(((parseFloat(productData.originalPrice)-parseFloat(productData.sellingPrice))/parseFloat(productData.originalPrice))*100).toFixed(0)}
                 filteredCart = {cartData.filter(cart => cart.supplierProductId === productData._id)}
               />
                </Col>
          </Row>
          </Container>
      </div>
      
      </Fragment>
                 
              
               
                
              
              
           
         
       
    </LayoutTwo>
  );
};


export default ProductFullwidth;


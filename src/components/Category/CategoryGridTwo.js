import Link from "next/link";
import {useEffect} from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProductActualList} from "../ProductThumb";
import Box from "@material-ui/core/Box";
import CustomScroll from "react-custom-scroll";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '70%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const CategoryGridTwo = ({ spaceBottomClass, categoryData, productData , firstCategory, cartData}) => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

 

  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
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
           
            
            
            return (
              
             <Col lg={3} md={6} >
             <div className="single-category single-category--one space-mb--5">
             <Card>
              <Card.Header style={{backgroundColor : "#FBFBFF"}}><Typography variant="h4" >
            <Box fontWeight="fontWeightBold">
            {category.categoryName}
              </Box>
              </Typography>
              <span style={{ color : "#31de79"}}>{productData.filter(product => product.supplierCategoryId === category._id)? 
              productData.filter(product => product.supplierCategoryId === category._id).length : 0} products listed</span>
              </Card.Header>
              <Card.Body>
            {/* <Card.Title>Product Count : {productData.filter(product => product.supplierCategoryId === category._id).length}</Card.Title> */}
                
                  <Accordion expanded={expanded === category._id || category._id === firstCategory} className={classes.root} onChange={handleChangePanel(category._id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id={category._id}
          >
            <Typography className={classes.heading}>
            <Box fontWeight="fontWeightBold">
              Explore Products
              </Box>
              </Typography>
            {/* <Typography className={classes.secondaryHeading}>I am an accordion</Typography> */}
          </AccordionSummary>
          <AccordionDetails id={category._id}>
          <div className="cart-overlay__content-container">
          <div className="cart-product-wrapper">
              <div className="cart-product-container">
              <CustomScroll allowOuterScroll={true}>
          {productData &&
        productData.map((product) => {
            if(product.supplierCategoryId === category._id)
            {
          const discountedPrice = parseFloat(product.sellingPrice).toFixed(2);
          const discount = (((parseFloat(product.originalPrice)-parseFloat(product.sellingPrice))/parseFloat(product.originalPrice))*100).toFixed(0);
          const productPrice = parseFloat(product.originalPrice).toFixed(2);
          const filteredCart = cartData.filter(cart => cart.supplierProductId === product._id);
          
          return(
            <ProductActualList
            product = {product}
            discountedPrice = {discountedPrice}
            discount = {discount}
            productPrice = {productPrice}
            filteredCart = {filteredCart}
            />
          )
          
            }
          })}
          </CustomScroll>
          </div>
          </div>
          </div>
          </AccordionDetails>
        </Accordion>
                {/* <Button size="small" variant="primary" onClick={(e) => {
                  e.preventDefault();
                  let string = window.location.origin + `/shop/no-sidebar/${category._id}`;
                  window.open(string, "_self");
                }}>Explore Products</Button> */}
              </Card.Body>
            </Card>
             </div>
            </Col>
            )
          })}
                  </Row>
      </Container>
    </div>
  );

  
  };

  
export default CategoryGridTwo;

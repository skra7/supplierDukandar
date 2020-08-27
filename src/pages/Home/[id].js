import { LayoutOne } from "../../components/Layout";
import { HeroSliderOne } from "../../components/HeroSlider";
import CategoryTab from "../../components/CategoryTab/CategoryTab";
import { ImageCta } from "../../components/Cta";
import heroSliderData from "../../data/hero-sliders/hero-slider-one.json";
import imageCtaData from "../../data/image-cta/image-cta-one.json";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BreadcrumbOne } from "../../components/Breadcrumb";
import Link from "next/link";
const Home = () => {
  const router = useRouter();
  const { id } = router.query;
  const { pathname } = router.pathname;
  const [categoryData , setCategoryData] = React.useState([]);
  const [ supplierData, setSupplierData] = React.useState([]);
  const [productData , setProductData] = React.useState([]);
 React.useEffect(() => {
  console.log("The Id of supplier is", id);

  async function getSellerInfoByUrl() {
    await fetch (
      `http://3.7.238.54:4000/seller/sellerInfoById?userId=${id}`,
      {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      }).then(r => r.json())
      .then(r => {
        console.log("The final response is", r);
        if(r.data[0].shopUrlString) {
          router.push(`/${r.data[0].shopUrlString}`)
        }
        else {
          localStorage.setItem("supplierId", id);
        }
      })
      .catch(err =>{
        localStorage.setItem("supplierId", id);
        console.log(err);
      }
    )
  }
  getSellerInfoByUrl();

  //var supplierId = localStorage.setItem("supplierId", id);
  async function getSupplierInfo() {
    await fetch (
      `http://3.7.238.54:4000/supplierInfo?id=${id}`,
      {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      }).then(r => r.json())
      .then(r => {
        setSupplierData(r.data.businessDetails);
        localStorage.setItem("supplierNumber",r.data.numberWithOutCountryCode);
        localStorage.setItem("supplierBusinessDetails",  JSON.stringify(r.data.businessDetails))
      })
      .catch(err =>{
        console.log(err);
      }
    )
  }
  getSupplierInfo();
  async function getCategory (){
     await fetch (
      `http://3.7.238.54:4000/supplierCategorybyId?id=${id}`,
      {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      }).then(r => r.json())
      .then(r => {
        setCategoryData(r.data[0])})
      .catch(err =>{
        console.log(err);
      }
    )
  }
  getCategory();
  async function getProduct (){
    await fetch (
     `http://3.7.238.54:4000/supplierProductByUser?id=${id}`,
     {
       method: 'GET',
       headers: new Headers({
         "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*"
       })
     }).then(r => r.json())
     .then(r => {
       setProductData(r.data[0])})
     .catch(err =>{
       console.log(err);
     }
   )
 }
 getProduct();
  
},[]);
  
  return (
    <LayoutOne aboutOverlay={true}>
      {/* hero slider */}
      {/* <BreadcrumbOne /> */}

      {/* product tab */}
      <CategoryTab
      categoryData = {categoryData}
      productData = {productData}
      />

      {/* image cta */}
      
    </LayoutOne>
  );
};




export default Home;

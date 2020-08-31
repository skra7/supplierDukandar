import { LayoutOne } from "../components/Layout";
import { HeroSliderOne } from "../components/HeroSlider";
import CategoryTab from "../components/CategoryTab/CategoryTab";
import { ImageCta } from "../components/Cta";
import heroSliderData from "../data/hero-sliders/hero-slider-one.json";
import imageCtaData from "../data/image-cta/image-cta-one.json";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BreadcrumbOne } from "../components/Breadcrumb";
import Link from "next/link";
const Home = () => {
  const router = useRouter();
  const { id } = router.query;
  const { pathname } = router.pathname;
  const [categoryData , setCategoryData] = React.useState([]);
  const [ supplierData, setSupplierData] = React.useState([]);
  const [productData , setProductData] = React.useState([]);
  const [firstCategory , setFirstCategory] = React.useState("");
 React.useEffect(() => {
  console.log("The Id of supplier is", id);
  async function getSupplierInfo() {
    await fetch (
      `http://3.7.238.54:4000/seller/sellerInfoByUrl?shopUrlString=${id}`,
      {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      }).then(r => r.json())
      .then(r => {
        async function getCategory (){
          await fetch (
           `http://3.7.238.54:4000/supplierCategorybyId?id=${r.data[0].userId}`,
           {
             method: 'GET',
             headers: new Headers({
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*"
             })
           }).then(r => r.json())
           .then(r => {
             setCategoryData(r.data[0])
             setFirstCategory(r.data[0][0]._id || "")
            })
             
           .catch(err =>{
             console.log(err);
           }
         )
       }
       getCategory();
       async function getProduct (){
         await fetch (
          `http://3.7.238.54:4000/supplierProductByUser?id=${r.data[0].userId}`,
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
        localStorage.setItem("sellerInfo", JSON.stringify(r.data[0]));
        localStorage.setItem("supplierId", r.data[0].userId);
      })
      .catch(err =>{
        console.log(err);
      }
    )
  }
  getSupplierInfo();
  
  
},[]);
  
  return (
    <LayoutOne aboutOverlay={true}>
      {/* hero slider */}
      {/* <BreadcrumbOne /> */}

      {/* product tab */}
      <CategoryTab
      categoryData = {categoryData}
      productData = {productData}
      firstCategory = {firstCategory}
      />

      {/* image cta */}
      
    </LayoutOne>
  );
};




export default Home;

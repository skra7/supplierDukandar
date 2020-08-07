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
  const router = useRouter()
  const { id } = router.query;
  const { pathname } = router.pathname;
  const [categoryData , setCategoryData] = React.useState([]);
  
 React.useEffect(() => {
  var supplierId = localStorage.getItem("supplierId");
  async function getCategory (){
     await fetch (
      `http://localhost:4000/supplierCategorybyId?id=${supplierId}`,
      {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      }).then(r => r.json())
      .then(r => {
        console.log("Response is", r.data[0]);
        setCategoryData(r.data[0])})
      .catch(err =>{
        console.log(err);
      }
    )
  }
  getCategory();
  console.log("Category List is", categoryData[0]);
},[]);
  
  return (
    <LayoutOne aboutOverlay={true}>
      {/* hero slider */}
      <BreadcrumbOne
        pageTitle="Home"
        backgroundImage="/assets/images/backgrounds/cartbg.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

         
        </ul>
      </BreadcrumbOne>

      {/* product tab */}
      <CategoryTab
      categoryData = {categoryData}
      />

      {/* image cta */}
      
    </LayoutOne>
  );
};




export default Home;

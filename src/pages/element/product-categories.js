import Link from "next/link";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { SectionTitleThree } from "../../components/SectionTitle";
import {
  CategorySlider,
  CategoryGrid,
  CategoryGridTwo
} from "../../components/Category";
import categoryData from "../../data/categories/category-one.json";

const ProductCategories = () => {
  const [categoryData , setCategoryData] = React.useState([]);
  React.useEffect(() => {
    async function getCategory (){

       await fetch (
        `http://15.207.67.143:4000/category`,
        {
          method: 'GET',
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          })
        }).then(r => r.json())
        .then(r => {
          console.log("Response is", r.data.slice(0,20));
          //console.log("Final Response is", r.data[0]["_id"].categoryName)
          setCategoryData(r.data.slice(0,20))})
        .catch(err =>{
          console.log(err);
        }
      )
    }
    getCategory();
    console.log("Category List is", categoryData);
  },[]);
  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Product Categories"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Product Categories</li>
        </ul>
      </BreadcrumbOne>
      <div className="element-wrapper space-mt--r130 space-mb--r130">
        <SectionTitleThree
          title="Categories"
          subtitle="This is where to find your satisfactory products"
        />
        {/* category grid */}
        <CategoryGridTwo categoryData={categoryData} spaceBottomClass="space-mb--r100" />

        {/* category slider */}
        {/* <SectionTitleThree
          title="Style 02"
          subtitle="This is where to find your satisfactory products"
        />
        <CategorySlider
          categoryData={categoryData}
          spaceBottomClass="space-mb--r100"
        />

        {/* category grid */}
        {/* <SectionTitleThree
          title="Style 03"
          subtitle="This is where to find your satisfactory products"
        />
        <CategoryGrid /> */} 
      </div>
    </LayoutTwo>
  );
};

export default ProductCategories;

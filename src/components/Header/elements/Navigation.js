import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
const Navigation = () => {
  const router = useRouter();
  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        <li>
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Home</a>
          </Link>
          {/* <IoIosArrowDown />
          <ul className="sub-menu sub-menu--mega sub-menu--mega--column-0">
          </ul> */}
        </li>
        {/* <li>
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Elements</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--mega sub-menu--mega--column-1">
            <li className="sub-menu--mega__title">
              <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                <a>Categories</a>
              </Link>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link
                    href="/element/product-categories"
                    as={process.env.PUBLIC_URL + "/element/product-categories"}
                  >
                    <a>Product Categories</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-sliders"
                    as={process.env.PUBLIC_URL + "/element/product-sliders"}
                  >
                    <a>Product Sliders</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-tabs"
                    as={process.env.PUBLIC_URL + "/element/product-tabs"}
                  >
                    <a>Product Tabs</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-widgets"
                    as={process.env.PUBLIC_URL + "/element/product-widgets"}
                  >
                    <a>Product Widget</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/recent-products"
                    as={process.env.PUBLIC_URL + "/element/recent-products"}
                  >
                    <a>Recent Products</a>
                  </Link>
                </li>
              </ul>
            </li>
                     </ul>
        </li> */}
             </ul> 
    </nav>
  );
};

export default Navigation;

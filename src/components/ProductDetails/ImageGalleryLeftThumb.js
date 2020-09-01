import { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import { IoMdExpand, IoIosHeartEmpty } from "react-icons/io";
import { Tooltip } from "react-tippy";
import { Row, Col } from "react-bootstrap";

const ImageGalleryLeftThumb = ({
  product,
 discount
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  
  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 5,
    loopedSlides: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    centeredSlides: true,
    breakpoints: {
      1200: {
        slidesPerView: 5,
        direction: "vertical"
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      320: {
        slidesPerView: 4,
        direction: "horizontal"
      }
    }
  };

  return (
    <Fragment>
      <Row className="align-items-center image-gallery-side-thumb-wrapper">
        <Col xl={2} className="order-2 order-xl-1">
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {/* <Swiper {...thumbnailSwiperParams}>
              {product.imageUrl &&
                product.imageUrl.split(',').map((image, i) => {

                  return (
                    <div key={i}>
                      <div className="single-image">
                        <img
                          src={image}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
            </Swiper> */}
          </div>
        </Col>
        <Col xl={10} className="order-1 order-xl-2">
          <div className="product-large-image-wrapper">
            {/* floating badges */}
            <div className="product-large-image-wrapper__floating-badges">
              {discount && discount > 0 ? (
                <span className="onsale">-{discount}%</span>
              ) : (
                ""
              )}
             
            </div>
               
            {/* wishlist button */}
            <LightgalleryProvider>
              <Swiper {...gallerySwiperParams}>
                {product.imageUrl &&
                  product.imageUrl.split(',').map((image, i) => (
                    <div key={i}>
                    <LightgalleryItem
                      group="any"
                      src={image} 
                      alt=""
                    >
                       <Tooltip
                        title="Click to enlarge"
                        position="left"
                        trigger="mouseenter"
                        animation="shift"
                        arrow={true}
                        duration={200}
                        >
                        <button className="enlarge-icon">
                          <IoMdExpand />
                        </button>
                        </Tooltip>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                        src={image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  )     
              )}
              </Swiper>
            </LightgalleryProvider>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ImageGalleryLeftThumb;

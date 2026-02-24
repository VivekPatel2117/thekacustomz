import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { getProductsByIdApi, getProductsByTagsApi, getRecommendedProductsApi } from "../../services/product.api";
import ProductCards from "../../components/ProductCards/ProductCards"
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
export const Product = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState(null);
  const getProductDetails =  async() => {
    try {
      const response =  await getProductsByIdApi(productId);
      console.log( "Response ",response)
        setProductData(response.data);
    }catch(err){
        console.log(err)
    };
};
const getRecommendedProducts = async () => {
    try {
      const res = await getRecommendedProductsApi(productId);
      if (res && res.data) {
        const data = res.data;
        const formattedData = data.map((item) => ({
          title: item.product_name,
          image: JSON.parse(item.product_images).hero_image,
          price: item.product_price,
          discount: item.discount_rate,
          link: `/products/${item.id}/${item.product_uuid}`
        }));
        console.log(formattedData)
        setRecommendedProducts(formattedData);
      }
    } catch (err) {
      console.error(err);
    }

  }
  useEffect(() => {
    if(productId){
        getProductDetails();
        getRecommendedProducts();
    }
  }, []);
  return (
    <> <Navbar/>
        {productData!== null && (
            <ProductDetails product={productData}/>

        )}    
        {recommendedProducts !== null && (
                <div className="section3">
                    <ProductCards title={"Recommended Products"} viewAllLink={"/products"} products={recommendedProducts} />
                </div>

        )}
<Footer/>
    </>
  )
}

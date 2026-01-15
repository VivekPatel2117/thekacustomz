import  {useEffect, useState}from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import heroDesktop from '../../images/Banner_desktop.png';
import heroMobile from '../../images/Banner_mobile.png';
import CollectionCards from "../../components/CollectionCards/CollectionCards.jsx";
import { getCollectionsApi } from '../../services/collection.api.js';
import ProductForm from '../../components/ProductForm/ProductForm';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import { getProductsByTagsApi } from '../../services/product.api.js';
import ProductCards from '../../components/ProductCards/ProductCards.jsx';
export default function Dashboard() {
  const [CollectionCardsData, setCollectionCardsData] = useState([]);
  const [BestSellingProductsData, setBestSellingProductsData] = useState([]);
  const loadCollections = async () => {
      const res = await getCollectionsApi();
      if(res && res.data){
        const data = res.data;
        const formattedData = data.map((item) => ({
          title: item.collection_name,
          image: item.collection_image,
          link: `/collections/${item.collection_name}`
        }));
        setCollectionCardsData(formattedData);
      }
    };
  const getProductsByTags = async (tags) => {
    try {
      const res = await getProductsByTagsApi(tags);
      if (res && res.data) {
        const data = res.data;
        const formattedData = data.map((item) => ({
          title: item.product_name,
          image: JSON.parse(item.product_images).hero_image,
          price: item.product_price,
          discount: item.discount_rate,
          link: `/products/${item.product_name}`
        }));
        setBestSellingProductsData(formattedData);
      }
    } catch (err) {
      console.error(err);
    }

  }
  useEffect(() => {
    loadCollections();
    getProductsByTags("best-seller");
  }, [])
  
  return (
    <>
        <Navbar/>
        <div className="section1">
            <Hero desktopImage={heroDesktop} mobileImage={heroMobile} heading={"Welcome to Custom Culture"} subHeading={"Where every piece tells your story."} buttonText={"Shop Now"} buttonLink={"/products"}/>
        </div>
        <div className="section2">
            <CollectionCards title={"Best selling collectons"} collections={CollectionCardsData} />
          </div>
          <div className="section3">
            <ProductCards title={"Best Selling Products"} viewAllLink={"/products"} products={BestSellingProductsData} />
          </div>
          <CollectionForm/>
        <ProductForm/>
    </>
  )
}

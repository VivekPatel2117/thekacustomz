import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Logo from "../../images/ThekaCustomz_logo_black.png";
import { useCartStore } from "../../store/useCartStore";
import {
  User,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
   const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}
      >
        {/* Mobile Menu Icon */}
        <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </div>

        {/* Left Menu */}
        <nav className={styles.leftMenu}>
         <a href="/products">Products</a>
          <a href="/collection/2">Stranger Collection</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/collection/3">Valentine Favourites</a>
        </nav>

        {/* Center Logo */}
        <div onClick={()=> navigate("/")} className={styles.logo}>
          <img style={{ height:"7vh", marginTop:"10%"}} src={Logo} alt="Theka Customz" />
        </div>

        {/* Right Icons */}
        <div className={styles.rightMenu}>
          <User onClick={()=> navigate("/auth")} size={20} />

          <div onClick={()=> setIsCartOpen(true)} className={styles.cartIcon}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.drawerHeader}>
          <span>Menu</span>
          <X size={22} onClick={() => setMenuOpen(false)} />
        </div>

        <nav className={styles.drawerMenu}>
          <a href="/products">Products</a>
          <a href="/collection/2">Stranger Collection</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/collection/3">Valentine Favourites</a>
        </nav>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={()=>setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;

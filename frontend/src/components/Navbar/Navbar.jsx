import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 3; // dynamic later from context/store

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
          <a href="#">Matching Tees</a>
          <a href="#">Stranger Collection</a>
          <a href="#">Contact Us</a>
          <a href="#">Valentine Favourites</a>
          <a href="#">Customization</a>
        </nav>

        {/* Center Logo */}
        <div className={styles.logo}>T</div>

        {/* Right Icons */}
        <div className={styles.rightMenu}>
          <Search size={20} />
          <User size={20} />

          <div className={styles.cartIcon}>
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
          <a href="#">Matching Tees</a>
          <a href="#">Stranger Collection</a>
          <a href="#">Contact Us</a>
          <a href="#">Valentine Favourites</a>
          <a href="#">Customization</a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

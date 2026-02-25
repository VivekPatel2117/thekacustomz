import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Contact.module.css";
import api from "../../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    } 
    const res = await api.post("/users/contact-us", { name, email, subject, message });
    console.log(res);
    if(res.data.success)    alert("Message submitted successfully!");
    else alert("Failed to submit message");
    // Integrate API here later
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Send us a message!</p>
        </div>

        <div className={styles.content}>
          {/* LEFT - CONTACT FORM */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                onChange={handleChange}
              ></textarea>

              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT - CONTACT INFO */}
          <div className={styles.infoSection}>
            <h3>Get In Touch</h3>
            <p><strong>Email:</strong> info@thekacustomz.com</p>
            <p><strong>Phone:</strong> +91 123456789</p>
            <p><strong>Location:</strong> Mumbai, India</p>

            <div className={styles.socials}>
              <p>Follow us:</p>
              <div className={styles.socialIcons}>
                <span><a href="https://www.instagram.com/thekacustomz" target="_blank">📸 Instagram</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
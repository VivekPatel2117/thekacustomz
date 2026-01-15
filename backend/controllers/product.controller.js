import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js";

/* CREATE */
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.log("Error in createProduct:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/* READ ALL */
export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* READ ONE */
export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, error: "Product not found" });
  }
};

/* UPDATE */
export const updateProduct = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* DELETE */
export const deleteProduct = async (req, res) => {
  try {
    await deleteProductService(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

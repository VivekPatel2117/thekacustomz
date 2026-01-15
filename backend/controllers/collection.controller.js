import {
  createCollectionService,
  getCollectionsService,
  getCollectionByIdService,
  updateCollectionService,
  deleteCollectionService
} from "../services/collection.service.js";

/* CREATE */
export const createCollection = async (req, res) => {
  try {
    const collection = await createCollectionService(req.body);
    res.status(201).json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET ALL */
export const getCollections = async (req, res) => {
  try {
    const collections = await getCollectionsService();
    res.json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET BY ID */
export const getCollectionById = async (req, res) => {
  try {
    const collection = await getCollectionByIdService(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found"
      });
    }

    res.json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
export const updateCollection = async (req, res) => {
  try {
    const collection = await updateCollectionService(
      req.params.id,
      req.body
    );

    res.json({ success: true, data: collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* DELETE */
export const deleteCollection = async (req, res) => {
  try {
    await deleteCollectionService(req.params.id);
    res.json({ success: true, message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

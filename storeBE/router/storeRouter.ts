import express from "express"
import { createProduct, detailedProduct, readProduct } from "../controller/storeController"
import { upload } from "../utils/multer"

const router = express.Router()

router.route("/view-products").get(readProduct)
router.route("/create-products").post(upload, createProduct)
router.route("/:productID/product-detail").get(detailedProduct)

export default router
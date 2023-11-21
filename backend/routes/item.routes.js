import express from "express";
import {
  validateAdmin,
  // validateWorkerAndAdmin,
} from "../middlewares/authMiddleware.js";
import {
  addBatteries,
  getAllItems,
  updateBattery,
  deleteBattery,
  rejectStock,
  getRequestedStocks,
  acceptStocks,
  getDeletedBatteries,
  updateRequestedItems,
} from "../controllers/battery.controller.js";

const router = express.Router();

router.get("/", validateAdmin, getAllItems);
router.post("/add", addBatteries);
router.put("/update/:id", validateAdmin, updateBattery);
router.delete("/delete/:id/:reason", validateAdmin, deleteBattery);
router.delete("/reject/:id", validateAdmin, rejectStock);
router.get("/stocks/requested", validateAdmin, getRequestedStocks);
router.put("/stock/accept", validateAdmin, acceptStocks);
router.get('/stocks/deleted',validateAdmin,getDeletedBatteries);
// router.put("/requested/update/:id",validateAdmin,updateRequestedItems);
router.put("/requested/update/:id",validateAdmin,updateRequestedItems)

export default router;

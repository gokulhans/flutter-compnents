const express = require("express");
const router = express.Router();
const blockController = require("../controllers/blockController");

// GET all blocks
router.get("/", blockController.getAll);

// GET block by ID
router.get("/:id", blockController.getById);

// POST a new block
router.post("/", blockController.create);

// UPDATE block by ID
router.put("/:id", blockController.updateById);

// DELETE block by ID
router.delete("/:id", blockController.deleteById);

module.exports = router;

const Block = require("../models/block");

const blockController = {
  create: async (req, res) => {
    try {
      const { name, code, link } = req.body;
      const newBlock = new Block({ name, code, link });
      await newBlock.save();
      res.json({ msg: "Block created", data: newBlock });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating block", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const blocks = await Block.find();
      res.json({ msg: "OK", data: blocks });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching blocks", error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const blockId = req.params.id;
      const block = await Block.findById(blockId);
      if (block) {
        res.json({ msg: "Block found", data: block });
      } else {
        res.status(404).json({ msg: "Block not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching block", error: error.message });
    }
  },
  updateById: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const updatedBlock = await Block.findOneAndUpdate(
        { _id: req.params.id },
        { name, email, password },
        { new: true }
      );
      if (updatedBlock) {
        res.json({ msg: "Block updated", data: updatedBlock });
      } else {
        res.status(404).json({ msg: "Block not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error updating block", error: error.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const deletedBlock = await Block.findOneAndDelete({ _id: req.params.id });
      if (deletedBlock) {
        res.json({ msg: "Block deleted", data: deletedBlock });
      } else {
        res.status(404).json({ msg: "Block not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting block", error: error.message });
    }
  },
};

module.exports = blockController;

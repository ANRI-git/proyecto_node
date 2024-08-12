import { Routine } from '../models/mongoDB/routines.js';

export const routineController = {
  getAllRoutines: async (_req, res) => {
    const routineCollection = await Routine.find();
    routineCollection.length
      ? res.status(200).json({
          success: true,
          message: 'List of routines',
          size: routineCollection.length,
          data: routineCollection,
        })
      : res
          .status(404)
          .json({ success: false, message: 'No routines in database' });
  },
  getByName: async (req, res) => {
    const { name } = req.query;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Missing 'name' in query param" });
    try {
      const routines = await Routine.find({ $text: { $search: name } });
      if (!routines.length)
        return res.status(404).json({
          success: false,
          message: `No routines with '${name}' in the name`,
        });
      res.status(200).json({
        success: true,
        message: 'Routines by query name',
        data: routines,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal error ${error}`,
      });
    }
  },
  getByType: async (req, res) => {
    const { type } = req.query;
    if (!type)
      return res
        .status(400)
        .json({ success: false, message: "Missing 'type' in query param" });
    try {
      const routines = await Routine.find({ type: type });
      if (!routines.length)
        return res.status(404).json({
          success: false,
          message: `No routines with '${type}' type`,
        });
      res.status(200).json({
        success: true,
        message: 'Routines by query type',
        data: routines,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal error ${error}`,
      });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Missing 'id' in query param" });
    try {
      const routine = await Routine.findOne({ _id: id });
      if (!routine)
        return res.status(404).json({
          success: false,
          message: `No routine with id '${id}'`,
        });
      res.status(200).json({
        success: true,
        message: 'Routine by query id',
        data: routine,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal error ${error}`,
      });
    }
  },
  createRoutine: async (req, res) => {
    const { name, description, duration, type, difficulty } = req.body;
    const newRoutine = new Routine({
      name,
      description,
      duration,
      type,
      difficulty,
    });
    try {
      const savedRoutine = await newRoutine.save();
      res.status(200).json({
        success: true,
        message: 'Routine created',
        data: savedRoutine,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateRoutine: async (req, res) => {
    const allowedFields = [
      'name',
      'description',
      'duration',
      'type',
      'difficulty',
    ];
    const { id } = req.params;
    try {
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((update) =>
        allowedFields.includes(update)
      );
      if (!isValidOperation)
        return res.status(400).json({
          success: false,
          message: 'Invalid field in the request body. Operation aborted',
        });
      const routine = await Routine.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!routine) {
        return res.status(404).json({
          success: false,
          message: 'Routine not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Routine updated',
        data: routine,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteRoutine: async (req, res) => {
    const { id } = req.params;
    try {
      const routine = await Routine.findByIdAndDelete(id);
      if (!routine)
        return res.status(404).json({
          success: false,
          message: 'Routine not found',
        });
      return res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

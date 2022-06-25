const { Project } = require('../models');

module.exports = {
  /**
   * GET /api/v1/projects
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  index: async (req, res) => {
    try {
      const projects = await Project.find({});
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved all projects',
        data: projects,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * POST /api/v1/projects
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  create: async (req, res) => {
    try {
      // const project = await Project.create(req.body);
      const projectData = req.body;
      // eslint-disable-next-line no-unused-vars
      const project = await Project.findOne({
        leader: req.body.leader,
        team: req.body.team,
        participants: req.body.participants,
      }).populate('leader', 'team');
      await Project.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Successfully created the project',
        data: projectData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * GET /api/v1/projects/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  show: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          success: true,
          message: 'Project not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved the project',
        data: project,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * PUT /api/v1/projects/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  update: async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        team: req.body.team,
        category: req.body.category,
        status: req.body.status,
        leader: req.body.leader,
        tasks: req.body.tasks,
        participants: req.body.participants,
        startDate: req.body.startDate,
      }, {
        new: true,
      });
      if (!project) {
        return res.status(404).json({
          success: true,
          message: 'Project not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully updated the project',
        data: project,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * DELETE /api/v1/projects/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  delete: async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Successfully deleted the project',
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },
};

const router = require("express").Router();
const {
  Project,
} = require("../../../../MIA-VIRT-FSF-PT-06-2024-U-LOLC/14-MVC/01-Activities/28-Stu_Mini-Project/Main/models");
const withAuth = require("../../../../MIA-VIRT-FSF-PT-06-2024-U-LOLC/14-MVC/01-Activities/28-Stu_Mini-Project/Main/utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

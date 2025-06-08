const Hoot = require('../models/hoot');

module.exports = {
  index,
  create,
  show,
  update,
  deleteHoot,
};

async function index(req, res) {
  try {
    // 
    const hoots = await Hoot.find({}).populate("author");
    // Below would return all hoots for just the logged in user
    // const hoots = await Hoot.find({author: req.user._id});
    res.json(hoots);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch hoots' });
  }
};

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to create hoot' });
  }
};

// Find the show function in the hoots controller
async function show(req, res) {
  try {
    // Update this line to populate both the hoot author and comment authors
    const hoot = await Hoot.findById(req.params.hootId)
      .populate('author')
      .populate('comments.author');
    
    if (!hoot) return res.status(404).json({ message: 'Hoot not found' });
    
    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to fetch hoot' });
  }
}

async function update(req, res) {
  try {
    // Find the hoot:
    const hoot = await Hoot.findById(req.params.hootId);

    // Check permissions:
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update hoot:
    const updatedHoot = await Hoot.findByIdAndUpdate(req.params.hootId, req.body, { new: true });

    // Append req.user to the author property:
    updatedHoot._doc.author = req.user;

    // Issue JSON response:
    res.status(200).json(updatedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

async function deleteHoot(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};




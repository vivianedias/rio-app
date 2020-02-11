const express = require('express')
const router = express.Router()
const passport = require('passport')

const Job = require('../../models/Job')

// @route   GET api/job/all
// @desc    Get jobs
// @access  Public
router.get('/all', (req, res) => {
  Job.find()
    .sort({ createdAt: -1 })
    .then(jobs => {
      if (!jobs) {
        errors.nojobs = 'Não existem vagas cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(jobs)
    })
    .catch(() => res.status(404).json({
      jobs: 'Não existem vagas cadastradas ainda'
    }))
})

// @route   GET api/job/
// @desc    Return all company jobs
// @access  Private

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const job = await Job.find().populate('company');

    return res.send({
      job
    });
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao carregar as vagas',
    });
  }
});

// @route   GET api/job/:jobId
// @desc    Return one company job
// @access  Private
router.get('/:jobId', passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    try {
      const job = await Job.findById(req.params.projectId).populate('company');

      return res.send({
        job
      });
    }
    catch (err) {
      res.status(400).send({
        error: ' Erro ao carregar as vagas',
      });
    }
  });


// @route   POST api/job/
// @desc    Create new job
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const company = Company.findOne({ user_id: req.user.id })
    try {
      const newJob = new Job({
        company_id: company.id,
        company_email: company.email,
        company: req.body.company,
        company_name: req.body.company_name,
        title: req.body.title,
        function: req.body.function,
        requirements: req.body.requirements,
        location: req.body.location,
        cache: req.body.cache,
        total_period: req.body.total_period,
      })
  
      const data = newJob.save()
      return res.json(data)
    }
    catch (err) {
      res.status(400).send({
        error: 'Erro ao criar a vaga',
      });
    }
  }
  catch (err) {
    res.status(400).send({
      error: 'Erro ao encontrar uma empresa para esse usuário',
    });
  }
});


// @route   PUT api/job/:jobId
// @desc    Update a job
// @access  Private
router.put('/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {

  const { name, occupation } = req.body; //this is example TO DO add all 

  try {
    const job = await Job.findOneAndUpdate(req.params.jobId, { name, occupation }, { new: true });

    await job.save();

    return res.send({
      job
    });
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao carregar a vaga',
    });
  }
});


// @route   DELETE api/job/:jobId
// @desc    Update  job
// @access  Private
router.post('/:jobId', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.jobId);

    return res.send();
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao deletar a vaga',
    });
  }
})

module.exports = router

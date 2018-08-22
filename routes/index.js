const express = require('express');
const router = express.Router();
const validate = require('validate.js');
const Link = require('../src/link');

router.post('/r', function(req, res, next) {
  const { url } = req.body;
  const error = validate.single(url, { url: true });
  if (error) {
    res.status(422).json({ error: error.join(' ') });
  }
  const link = new Link(url);
  link.generateShortID().save(req).then(shortLink => {
    res.format({
      json: () => res.status(200).json({ shortLink }),
      text: () => res.status(200).send(shortLink),
      html: () => res.status(200).send(shortLink),
    });
  }).catch(error => {
    res.format({
      json: () => res.status(500).json({ error }),
      text: () => res.status(500).send(error),
      html: () => res.status(500).send(error),
    });
  });
});

router.get('/r', (req, res) => {
  res.status(204).send();
});

router.get('/r/:short', (req, res) => {
  const short = req.params.short;
  Link.get(short).then(result => {
    if (result) {
      const url = result.URL;
      res.format({
        json: () => res.status(200).json({ url }),
        text: () => res.status(302).redirect(url),
        html: () => res.status(302).redirect(url),
      });
    } else {
      res.format({
        json: () => res.status(404).json({ error: 'URL Not found' }),
        text: () => res.status(404).send('URL Not found'),
        html: () => res.status(404).send('URL Not found')
      })
    }
  }).catch(error => {
    res.format({
      json: () => res.status(500).json({ error }),
      default: () => res.status(500).send(error),
    })
  })
});

module.exports = router;

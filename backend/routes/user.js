const { Router } = require('express');

const router = Router();



router.get('/', (req, res) => {
       res.json({ ok: true, msg: 'get-api' })
});

router.put('/', (req, res) => {
       res.json({ ok: true, msg: 'put-api' })
});

router.post('/', (req, res) => {
       console.log(req.body)
       //req.body.location.map(item => console.log(item))
       res.json({ ok: true, msg: 'post-api' })
});

router.delete('/', (req, res) => {
       res.json({ ok: true, msg: 'delete-api' })
});



module.exports = router;
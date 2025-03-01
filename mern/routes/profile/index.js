const express = require('express')
const { ProfileCtrl} = require('../../controllers')


const router = express.Router()

router.get('/profile/details', ProfileCtrl.details)

router.put('/profile/edit', ProfileCtrl.profile)
router.patch('/profile/edit', ProfileCtrl.profile)


router.put('/profile/password', ProfileCtrl.password)
router.patch('/profile/password', ProfileCtrl.password)



router.post('/prducts/:id/review', ProfileCtrl.addReview)


router.get('/profile/reviews', ProfileCtrl.reviews)

module.exports = router
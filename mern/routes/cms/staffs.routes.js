const express = require('express')

const {Cms }= require("../../controllers")

const router  =express.Router()

router.route('/')
.get( Cms.StaffsCtrl.index) // ✅ "/cms/staffs" will call the index method
.post( Cms.StaffsCtrl.store)


router.route('/:id"')
.post( Cms.StaffsCtrl.show)
.put( Cms.StaffsCtrl.update)
.patch(Cms.StaffsCtrl.update)
.delete(Cms.StaffsCtrl.destroy)

module.exports = router
const express = require('express')
const staffsRoutes = require("./staffs.routes") // ✅ Corrected variable name
const { adminUser } = require("../../lib")

const router = express.Router()

router.use('/staffs',adminUser, staffsRoutes) // ✅ Now it works

module.exports = router

// https://broadwaynp.sharepoint.com/sites/MERNStackClass130PMMay15Nitishsir/_layouts/15/stream.aspx?id=%2Fsites%2FMERNStackClass130PMMay15Nitishsir%2FShared%20Documents%2FGeneral%2FRecordings%2FMeeting%20in%20%5FGeneral%5F%2D20230702%5F131251%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E92c19c45%2D0db8%2D444a%2D8780%2D7bc5bbdebf4d
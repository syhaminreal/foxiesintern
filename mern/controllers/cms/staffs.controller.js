const { showError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class StaffsController {
    index = async (req, res, next) =>{
        try {
            const staffs = await User.find({type: 'Staff'})
            res.json(staffs)
            
        } catch(error) {
            showError(error, next)
            
        }

    }

    store = async (req, res, next) => {
        try{ 
            const {name, email, password, confirm_password, phone, address, status } = req.body

            if(password === confirm_password){

                const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

                await User.create({name, email,password: hash, phone, address, status, type: 'Staff'})


                res.status(201).json({
                    sucess: "Satff created. "
                })
            }else{
                next({
                    message: "Password not confirmed",
                    status: 422
                })
            }

        } catch(error) {
            showError(error, next)
            
        }

    }

    show = async (req, res, next) => {
        try {

            const staff = await User.findById(req.params.id)

            if(staff){
                res.json(staff)
            }else {
                next ({
                    message: "Satff not found",
                    sataus: 404
                })
            }
            
        } catch (error) {
            showError(error, next)
            
        }


    }
    update = async(req, res, next) =>{
        try {
            const {name, phone,address, status} =req.body

            await User.findByIdAndUpdate(req.aprams.id, {name, phone, address, status})

            res.json({Sucess : 'Staff Updated.'})
            
        } catch (error) {
            showError(error, next)
        }
    }



    
    destroy = async(req, res, next) =>{
        try {
            await User.findByIdAndDelete(res.params.id)

            res.json({Sucess : 'Staff removed'})
            
        } catch (error) {
            showError(error, next)
        }
    
}

}
module.exports = new StaffsController
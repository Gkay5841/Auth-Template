import User from '../models/User.js'

export const login = async (req,res) => {
    const {username,password} = req.body

    try {
        const user = await User.findOne({ username, password });


        if(!user){
            res.status(404).json({message: "Please correct username or password login"})
        }

        res.status(200).json({message: "login succesfull!"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
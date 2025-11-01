import User from '../models/User.js'

export const signUp = async (req,res) => {
    const {email, username, password } = req.body

    try {        
        const newUser = new User({
            email,
            username,
            password,
        })
        
        await newUser.save()

        const findEmail = await User.findOne({email})

        if (!email || !username || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
        }

        res.status(200).json({message: "Created new user"})
    }catch(err) {
        res.status(500).json({message: "Dont create new user"}, err)
    };
}
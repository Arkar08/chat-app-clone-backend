import Users from "../models/UserSchema.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";


export const LoginController = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('Plz filled out in the form field.')
    }
    try {
        const validatorEmail = await Users.findOne({ email:email });

        if (validatorEmail) {
          const validatorPassword = await bcrypt.compare(
            password,
            validatorEmail.password
          );
          if (validatorPassword) {
            const token = await generateToken(res, validatorEmail._id);
            return res.status(200).json({
              email: validatorEmail.email,
              isAdmin: validatorEmail.isAdmin,
              token,
            });
          }
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const SignupController = async(req,res)=>{
    const {name,email,password,contact} = req.body;
    if(!name || !email || !password || !contact){
        return res.status(400).json('Plz filled out in the form field.')
    }
    try {
        const findEmail = await Users.findOne({email:email})
        if(findEmail){
            return res.status(400).json('Email already exists.')
        }
        const findName = await Users.findOne({name:name})
        if(findName){
            return res.status(400).json('Name already exists.')
        }
        if(password.length < 6){
            return res.status(400).json('password is minLength 6')
        }

        const salt =await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        const newUser = await Users.create({
            name:name,
            email:email,
            password:hash,
            contact:contact
        })
        generateToken(res, newUser._id);
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}
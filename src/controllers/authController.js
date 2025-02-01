import Users from "../models/UserSchema.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";


export const LoginController = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:'Plz filled out in the form field.'})
    }
    try {
        const validatorEmail = await Users.findOne({ email:email });
        if(!validatorEmail){
            return res.status(400).json({message:"email is wrong."})
        }

        if (validatorEmail) {
          const validatorPassword = await bcrypt.compare(
            password,
            validatorEmail.password
          );
          if(!validatorPassword){
            return res.status(400).json({message:'Password is wrong.'})
          }
          if (validatorPassword) {
            const token = await generateToken(res, validatorEmail._id);
            const getData = {
                id:validatorEmail._id,
                email:validatorEmail.email,
                name:validatorEmail.name,
                token,
            }
            const postData = {
                status:200,
                success:true,
                data:getData
            }
            
            return res.status(200).json(postData);
          }
        }
    } catch (error) {
        return res.status(500).json({message:error})
    }
}


export const SignupController = async(req,res)=>{
    const {name,email,password,contact} = req.body;
    if(!name || !email || !password || !contact){
        return res.status(400).json({message:'Plz filled out in the form field.'})
    }
    try {
        const findEmail = await Users.findOne({email:email})
        if(findEmail){
            return res.status(400).json({message:'Email already exists.'})
        }
        const findName = await Users.findOne({name:name})
        if(findName){
            return res.status(400).json({message:'Name already exists.'})
        }
        if(password.length < 6){
            return res.status(400).json({message:'password is minLength 6'})
        }
        const findContact = await Users.findOne({contact:contact})
        if(findContact){
            return res.status(400).json({message:"PhNo is already exist."})
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
        const token = await generateToken(res, newUser._id);
        const getData = {
            token,
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }
        const postData = 
            {
                status:201,
                success:true,
                data:getData
            }
        
        return res.status(201).json(postData)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const LogoutController = (req,res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: new Date(0),
      });
    return res.status(200).json("logout successfully");
}


export const getUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const findUsers = await Users.findOne({_id:id})
        if(!findUsers){
            return res.status(404).json('Something went wrong')
        }
        const passData = findUsers.toObject()
        delete passData.password;
        delete passData.createdAt;
        delete passData.updatedAt
        const data = {
            success :true,
            status:200,
            data:passData
        }
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}
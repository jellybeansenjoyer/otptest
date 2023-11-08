const express = require('express');
const body_parser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const twilio = require('twilio');
const otp = require('./models/otp.js');
const Student = require('./models/student.js');
const Event = require('./models/event.js');
const yt = require('./models/yt');
const accountSid = 'AC4bc5962457645eeb1f150b9fd8e08a11';
const authToken = 'daa32fc1c28fef149054c1468b648580';
const client = twilio(accountSid,authToken);

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

const generateSecretKey = ()=>{
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const jwt = require('jsonwebtoken');
mongoose.connect('mongodb+srv://raghavkashyap26:raghavkashyap26@raghav.jvmxdco.mongodb.net/',{
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(`${err}`);
});
let OTP,user;

app.post('/sendInfo',async(req,res)=>{
    try{
        const {name,phone} = req.body;
        const existingStudent = await Student.findOne({phone});
        if(existingStudent){
            res.status(400).json({message:"Phone already exists, Info send fails"});
        }
        const secretKey = generateSecretKey();

        const newStudent = new Student({name,phone,email:"",course:"",specialization:"",collegeName:"",year:"",projects:"",bio:"",linkedIn:"",github:"",insta:"",others:""});
        await newStudent.save();
        const token = jwt.sign({studentId:newStudent._id},secretKey);

        res.status(200).json({token:token});
    }catch(err){
        console.log(err,"error sending data");
        res.status(500).json({message:err.message});
    }
});
app.post('/login',async(req,res)=>{
    try{
        const {number} = req.body;
        const existingUser = await Student.findOne( {phone:number });
        if(!existingUser){
            return res.status(400).json({message:"User with the number does'nt exists, signup"});
        }

        

        let digits = "0123456789";
        OTP = '';
        for(let i=0;i<4;i++){
            OTP +=digits[Math.floor(Math.random()*10)];
        }
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 120);
        
        user = new otp({
            number:number,
            code:OTP,
            ttl:expirationTime
         });
        
        await user.save();
        
        setTimeout(() => {
            otp.deleteOne({ number }).exec(); // Delete the OTP document
          }, 120*1000);

        await client.messages.create({
            body:`your otp verification for user ${number} is ${OTP}`,
            from:'+13347817005',
            to:number
        }).then(()=>{
            res.status(200).json({message:'message sent'});
        })

    }catch(err){
        console.log(err,"error signing up");
        res.status(500).json({message:err.message});
    }
});

app.post('/signup',async(req,res)=>{
    try{
        const {number} = req.body;
        const existingUser = await Student.findOne( { phone:number });
        if(existingUser){
            return res.status(400).json({message:"User with the same number already exists"});
        }
        let digits = "0123456789";
        OTP = '';
        for(let i=0;i<4;i++){
            OTP +=digits[Math.floor(Math.random()*10)];
        }
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 120);
        
        user = new otp({
            number:number,
            code:OTP,
            ttl:expirationTime
         });
        
        await user.save();
        
        setTimeout(() => {
            otp.deleteOne({ number }).exec(); // Delete the OTP document
          }, 120*1000);

        await client.messages.create({
            body:`your otp verification for user ${number} is ${OTP}`,
            from:'+13347817005',
            to:number
        }).then(()=>{
            res.status(200).json({message:'message sent'});
        })

    }catch(err){
        console.log(err,"error signing up");
        res.status(500).json({message:err.message});
    }
});

app.post('/verify',async(req,res)=>{
    try{
        const {otpCode,number} = req.body;
        const user = await otp.findOne({number:number});
        const student = await Student.findOne({phone:number});
        if(!user){
            return res.status(400).json({message:"user time expired",verified:false,token:undefined});
        }
        console.log(otpCode," ",user.code);
        const secretKey = generateSecretKey();
        if (user.code === otpCode){
            await otp.findOneAndDelete({ number:number });
            if(student){
                const token = jwt.sign({studentId:student._id},secretKey);
                return res.status(200).json({message:"user verified successfully",verified:true,token:token});
            }else
            return res.status(200).json({message:"user verified successfully",verified:true,token:undefined});

        }else{
            await otp.findOneAndDelete({ number:number });
            return res.status(400).json({message:"invalid otp",verified:false,token:undefined});
        }
    }catch(err){
        console.log(err,"error verifying");
        res.status(500).json({message:err.message,verified:false,token:undefined});
       
    }
})

app.get('/user/phonePresent/:phoneNumber',async (req,res)=>{
    try{
        const phoneNumber = req.params.phoneNumber;
        const student = await Student.findOne({ phone:phoneNumber });

    if (student) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
    }catch(error){
        console.log('error',error);
        res.status(500).json({message:"error getting user"});
    }
});

app.post('/events', async (req, res) => {
    try {
      const { name, date, address, people,image } = req.body;
  
    const dateComponents = date.split('/').map(Number);
    const dateCurrent = new Date();
    const dateObject = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0]);
    const active = dateCurrent<=dateObject? true:false;
    const imageObj = image? image:"https://img.freepik.com/free-vector/manager-with-checklist-creating-event-plan-development-event-management-planning-service-how-plan-event-planning-software-concept-pinkish-coral-bluevector-isolated-illustration_335657-1351.jpg?w=2000";
      const event = new Event({
        name:name,
        date:dateObject,
        address:address,
        people:people,
        active:active,
        image:imageObj
    });
  
      await event.save();
  
      res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating event' });
    }
  });
  
  app.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
  
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching events' });
    }
  });
  app.get('/users/:id', async (req, res) => {
    try{
        const studentId = req.params.id;
    
        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    }catch(error){
        
      console.error(error);
      res.status(500).json({ message: 'Error fetching events' });
    }
    
  });

  app.put('/users/:userId/update-bio', async (req, res) => {
    try {
      const studentId = req.params.userId;
      const newBio = req.body.bio; 

      const student = await Student.findByIdAndUpdate(
        studentId,
        { $set: { bio: newBio } },
        { new: true } 
      );
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user bio' });
    }
  });
  app.post('/youtube', async (req, res) => {
    try {
      const { name, image, description, url } = req.body;
      const newYouTubeEntry = new yt({ name, image, description, url });
      const savedEntry = await newYouTubeEntry.save();
      res.json(savedEntry);
    } catch (error) {
      console.error('Error creating YouTube entry:', error);
      res.status(500).json({ error: 'Failed to create YouTube entry' });
    }
  });

  app.get('/youtube', async (req, res) => {
    try {
      const allYouTubeEntries = await yt.find();
      
      res.json(allYouTubeEntries);
    } catch (error) {
      console.error('Error fetching YouTube entries:', error);
      res.status(500).json({ error: 'Failed to fetch YouTube entries' });
    }
  });

  app.put('/update/:id', async (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body; 
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      if (updatedStudent) {
        res.json({ message: 'Student updated successfully', updatedStudent });
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.put('/events/:eventId/register', async (req, res) => {
  const eventId = req.params.eventId;
  const newUserId = req.body.userId;

  try {
    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Append the newUserId to the registrations array
    event.registrations.push(newUserId);

    // Save the updated event
    const updatedEvent = await event.save();

    res.json({ message: 'User registered successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
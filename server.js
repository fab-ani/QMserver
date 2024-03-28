import express from 'express'
import extractingTextFromPDF from './textToPDF.js'
import multer from 'multer'
import cors from 'cors' 


const app = express();

const storage = multer.memoryStorage();
const upload = multer({storage:storage})

app.use(express.json());
app.use(cors())

app.post('/api',upload.single('file') ,async(req, res)=>{
    
    try{
        const {file} = req;
        if(!file){
            return res.status(400).send('No file uploaded')
        }
        console.log('The extracted TTTTTTTT textxxx',typeof(file));

        const extractedText = await extractingTextFromPDF(file.buffer);
        
        res.send(extractedText);
    }catch(error){
        console.error('Error extracting text', error)
        res.status(500).send('Error extracting PDF')
    }
});

app.get('/', (req, res)=>{
    res.send('Welcome to my express server!')
})
const port = 5000
app.listen(port, ()=>{
    console.log(`Server is running to port on http://localhost:${port}`)
})





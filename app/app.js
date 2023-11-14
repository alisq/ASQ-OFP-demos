const express = require('express')
const app = express()
const multer  = require('multer');
var Datastore = require('nedb');
//var app = express();
//var server = app.listen(3000, listening);
var db = new Datastore({ filename: 'data.json', autoload: true });
var path = require('path');
var sharp = require('sharp');
const port = 53828
let filename;
let origName;



// db.insert(doc, function (err, newDoc) {   // Callback is optional
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
// });
app.use(express.static('public')); //load files from this route

app.get('/json', function(req, res, next) {

    db.find({}).sort({ filename: -1 }).exec( function (err, docs) {
        
        res.json(docs);
    });
   
  });


// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        //console.log(file);
         
        filename = Date.now() + path.extname(file.originalname);
        origName = file.originalname;
        cb(null, filename);

    }
});



  
//console.log(db.find({}))


const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {

    

    try {
        sharp(req.file.path).resize(400, null).toFile('public/uploads/thumbnails/' + filename, (err, resizeImage) => {})
        var doc = { filename: filename, student: req.body.student, instructor:req.body.instructor, originalname:origName};
        db.insert(doc, function (err, newDoc) {   // Callback is optional
            sharp(req.file.path).resize(1600, null).toFile('public/uploads/large/' + filename, (err, resizeImage) => {})

      });

        return res.send('success!');
        
        
    } catch (error) {
        //console.error(error);
    }
    
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));



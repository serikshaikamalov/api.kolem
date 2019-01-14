// Get Data Models
const Projects = require('../models/project');
const constants = require('../../config/constants');

exports.getProjects = (req, res, next) => {
                
    Projects.find({}, ( err, result )=>{        
        if (err){ res.status(400).json(err); }

        // Change Image Path
        result.map( x =>{
            
            // File: Avatar
            if( x.avatar ){
                x.avatar = x.avatar ? constants.STATIC_SERVER_HTTP + x.avatar : null
            }       

            // File: Main Image
            if( x.mainImage ){
                x.mainImage = x.mainImage ? constants.STATIC_SERVER_HTTP + x.mainImage : null
            }       

            // Files: Single Images
            if( x.singleImages ){
                for(let i=0; i < x.singleImages.length; i++){
                    x.singleImages[i] = x.singleImages[i] ? constants.STATIC_SERVER_HTTP + x.singleImages[i] : null
                }                
            }
            
            // Files: Double Images
            if( x.doubleImages ){
                for(let i=0; i < x.doubleImages.length; i++){
                    x.doubleImages[i] = x.doubleImages[i] ? constants.STATIC_SERVER_HTTP + x.doubleImages[i] : null
                }                
            }
            
            
        });

        // Sort
        result.sort((a, b)=>{
            return b.dateTime-a.dateTime;
        });
                 
        res.json(result)
    });    
}

exports.getSingleProject = (req, res, next) => {
                
    const _id = req.params.id;    
    Projects.findOne({ _id }, (err, x)=>{

        // Modify avatar
        // user.avatar = constants.STATIC_SERVER_HTTP + user.avatar;

        // File: Avatar
        if( x.avatar ){
            x.avatar = x.avatar ? constants.STATIC_SERVER_HTTP + x.avatar : null
        }       

        // File: Main Image
        if( x.mainImage ){
            x.mainImage = x.mainImage ? constants.STATIC_SERVER_HTTP + x.mainImage : null
        }       

        // Files: Single Images
        if( x.singleImages ){
            for(let i=0; i < x.singleImages.length; i++){
                x.singleImages[i] = x.singleImages[i] ? constants.STATIC_SERVER_HTTP + x.singleImages[i] : null
            }                
        }
        
        // Files: Double Images
        if( x.doubleImages ){
            for(let i=0; i < x.doubleImages.length; i++){
                x.doubleImages[i] = x.doubleImages[i] ? constants.STATIC_SERVER_HTTP + x.doubleImages[i] : null
            }                
        }

        res.json( x );
    });   
}

exports.AddProject = ( req, res, next ) =>{

    console.log('Body: ', req.body );
    console.log('Files: ', req.files );

    // Defaults
    let files = {
        avatar: null,   
        mainImage: null,
        singleImages: [],
        doubleImages: []
    }

    // Collect Data Model
    if( req.files && req.files.length > 0 ){

        // File: Avatar Image
        const avatarImage = req.files.filter(x => x.fieldname == 'avatar').shift();
        if( avatarImage ){
            files.avatar = constants.IMAGE_PATH + avatarImage.filename;
        }

        // File: Main Image
        const mainImage = req.files.filter(x => x.fieldname == 'mainImage').shift();
        if( mainImage ){
            files.mainImage = constants.IMAGE_PATH + mainImage.filename;
        }

        // Files: Single Images
        const singleImages = req.files.filter(x => x.fieldname == 'singleImages');
        if( singleImages ){
            for(let i=0; i< singleImages.length; i++ ){
                files.singleImages.push( constants.IMAGE_PATH + singleImages[i].filename);
            }            
        }

        // Files: Double Images
        const doubleImages = req.files.filter(x => x.fieldname == 'doubleImages');
        if( doubleImages ){
            for(let i=0; i< doubleImages.length; i++ ){
                files.doubleImages.push( constants.IMAGE_PATH + doubleImages[i].filename);
            }            
        }        
    }
        
    const data = new Projects({
        title: req.body.title,
        type: req.body.type,
        year: req.body.year,
        area: req.body.area,
        location: req.body.location,  
        avatar: files.avatar,
        mainImage: files.mainImage,      
        singleImages: files.singleImages,
        doubleImages: files.doubleImages,
        dateTime: Date.now()
    });

    // Save to DB
    Projects.create( data, (err, result)=>{
        if(err){
            return console.log(err);
        }else{
            res.status(200).json("Added new project");
        }        
    });
}

exports.UpdateProject = ( req, res, next ) => {
    console.log('params:', req.params);
    console.log('body', req.body);

    /**
     * Params
     */
    const id = req.params.id;
    const query = { '_id': id };

    // Defaults
    let files = {
        avatar: null
    }

    // Files
    if( req.files && req.files.length > 0 ){

        // Avatar
        const avatarImage = req.files.filter(x => x.fieldname == 'avatar').shift();
        if( avatarImage ){
            files.avatar = constants.IMAGE_PATH + avatarImage.filename;
        }        
    }

    const data = {
        title: req.body.title,
        year: req.body.year,
        area: req.body.area,
        location: req.body.location        
    }

    console.log('Data: ', data);

    Projects.updateOne( query, data, (err, result) =>{
        if (err) {
            res.json({'error':'An error has occurred'});
        }else{
            res.json('Updated successfully!')
        }
        
    });
}

exports.DeleteProject = ( req, res, next ) => {
    console.log('params: ', req.params);

    const id = req.params.id;
    const query = { '_id': id };

    Projects.remove(query, ( err, result )=>{
        if( err ){
            res.json({'error':'An error has occurred'});
        }
        res.json('User ' + id + ' deleted!');
    })
}
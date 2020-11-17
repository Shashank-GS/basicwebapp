const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get post 
router.get('/', async (req, res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray()); 
});  

router.post('/', async (req, res)=>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    }); 
    res.status(201).send(); 
   

}); 

router.delete('/:id', async (req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id), 
    }); 
    res.status(200).send(); 
   

}); 

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://shashank:shashank@cluster0.eidtw.mongodb.net/vue_express?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client.db('vue_express').collection('posts') ;   
}
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://shashank:shashank@cluster0.eidtw.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



module.exports = router;

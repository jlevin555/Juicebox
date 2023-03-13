const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');


tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
  
    next();
  });
  
  tagsRouter.get('/', async (req, res) => {
    //try{
      const tags = await getAllTags();
    //   const tags = allTags.filter(tag => {
    //     return tags.active || (req.user && tags.id === req.user.id);
    //   });
    
      res.send({
        tags
      });
    // } catch ({ name, message }){
    //     // ;
    //}
});

    tagsRouter.get('/:tagName/posts', async (req, res, next) => {
        const tagname = req.params.tagName
        console.log("tagname", tagname) 
        // read the tagname from the params
        try {
            const tags = allTags.filter(tag => {
            return tags.active || (req.user && tags.id === req.user.id);
            }); 
           const posts = getPostsByTagName(tagname)
           if (!posts){
            res.send({posts: posts})
           }
          // use our method to get posts by tag name from the db
          // send out an object to the client { posts: // the posts }
        } catch ({ name, message }) {
          // forward the name and message to the error handler
          next ({ name, message })
          console.log(name, message)
            
    }
    });



module.exports = tagsRouter;
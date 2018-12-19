const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd5046e922be4444fb8580b67b4cccb06'
   });

const handleImage = (req, res, db) => {
    const {id} = req.body;
    return db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('API error') )

}

module.exports= {
    handleImage:handleImage,
    handleApiCall:handleApiCall
}
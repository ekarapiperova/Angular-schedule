const { themeModel, userModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getMyThemes(req, res, next) {
    const { username} = req.params;
    themeModel.find({username:username})
        .then(theme => res.json(theme))
        .catch(next);
}


function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .then(theme => res.json(theme))
        .catch(next);
}
function sortbyDate(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    themeModel.find()
        .sort({ date: 'asc' })
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);
}
function createTheme(req, res, next) {
    const { themeId, themeName, date, username } = req.body;
    const controlDay = new Date(date).getUTCDate();
    const controlYear = new Date(date).getUTCFullYear();
    const controlMoth = new Date(date).getUTCMonth();

    const controldate = new Date(controlYear, controlMoth, controlDay).toISOString().substring(0,10);
    console.log(themeName, date, controldate, username);
    if(themeName==="first"){   
    themeModel.findOne({ username: username, date: controldate, themeName:'second'}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            if (result === null) {
                console.log(result);
                themeModel.create({ themeName, date, username })
                    .then((theme) => {
                        userModel.updateOne({ username: username }, { $push: { shifts: theme._id }, $addToSet: { shifts: themeId } }),
                            themeModel.findByIdAndUpdate({ _id: themeId })
                        res.send(theme);
                        console.log(theme);
                    })
                    .catch(next);
            }
            else {

                console.log(result);
                console.log('found');
                res.send(result);

            }

        }
    })
    }else{
        themeModel.findOne({ username: username, date: date}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                if (result === null) {
                    console.log(result);
                    themeModel.create({ themeName, date, username })
                        .then((theme) => {
                            userModel.updateOne({ username: username }, { $push: { shifts: theme._id }, $addToSet: { shifts: themeId } }),
                                themeModel.findByIdAndUpdate({ _id: themeId })
                            res.send(theme);
                            console.log(theme);
                        })
                        .catch(next);
                }
                else {
    
                    console.log(result);
                    console.log('found');
                    res.send(result);
    
                }
    
            }
        })
        

    }



}

function deleteTheme(req, res, next) {
    const { themeId } = req.params;


    Promise.all([

        themeModel.findOneAndDelete({ _id: themeId })
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

module.exports = {
    getThemes,
    getMyThemes,
    createTheme,
    deleteTheme,
    getTheme,
    subscribe,
    sortbyDate
}

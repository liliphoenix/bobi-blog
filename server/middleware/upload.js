// const multer  = require('multer');
// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended:true}));
// router.use(bodyParser.json());
// export const upload = multer({storage:
//         multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'public/upload/')
//         }, filename: function (req, file, cb) {
//             cb(null,Date.now() + '.' + file.originalname.split('.')[1])
//         }
//     })
// });
import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "data/file/");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + "-" + file.originalname);
	},
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;

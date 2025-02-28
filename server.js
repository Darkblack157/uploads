var express = require("express");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var cors = require("cors");

var app = express();
var port = 4000;

app.use(cors());
app.use(express.static("public")); // Servir arquivos estáticos da pasta public

// Criar a pasta "public/uploads" se não existir
var uploadDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer para armazenar os arquivos na pasta "public/uploads"
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public", "uploads"));
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        var filename = Date.now() + ext;
        cb(null, filename);
    }
});

var upload = multer({ storage: storage });

// Rota de upload
app.post("/upload", upload.single("file"), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    var baseURL = `${req.protocol}://${req.get("host")}`; // Captura dinamicamente o domínio do servidor
    var fileUrl = `${baseURL}/uploads/${req.file.filename}`;

    res.json({
        message: "Upload realizado com sucesso!",
        fileUrl: fileUrl
    });
});

// Iniciar o servidor
app.listen(port, function () {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});

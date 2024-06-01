import express from 'express';
import bodyParser from 'body-parser';
import multer from "multer";
import fs from "file-system";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let posts = [];

const upload = multer({ dest: 'uploads/' })

const currentDate = new Date().getFullYear();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads')); 

app.use(bodyParser.urlencoded({ extended: true }));

const clearPostsAndUploads = () => {

    posts = [];

    const uploadDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadDir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(uploadDir, file), err => {
                if (err) throw err;
            });
        }
    });

    const postsDir = path.join(__dirname, 'views', 'posts');
    fs.readdir(postsDir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(postsDir, file), err => {
                if (err) throw err;
            });
        }
    });
};

setInterval(clearPostsAndUploads, 3600000);

app.get("/", (req, res) => {
    res.render("index", { currentDate: currentDate });
});
app.post("/", (req, res) => {
    res.render("index", { currentDate: currentDate });
});
app.get('/ai-software-development', (req, res) => {
    res.render('ai-software-development.ejs', { currentDate: currentDate });
});
app.get('/cybersecurity', (req, res) => {
    res.render('cybersecurity.ejs', { currentDate: currentDate });
});
app.get('/python-optimization', (req, res) => {
    res.render('python-optimization.ejs', { currentDate: currentDate });
});
app.get('/programming-languages', (req, res) => {
    res.render('programming-languages.ejs', { currentDate: currentDate });
});
app.get('/computer-science', (req, res) => {
    res.render('computer-science.ejs', { currentDate: currentDate });
});
app.get('/functional-programming', (req, res) => {
    res.render('functional-programming.ejs', { currentDate: currentDate });
});
app.get('/blockchain-evolution', (req, res) => {
    res.render('blockchain-evolution.ejs', { currentDate: currentDate });
});
app.get('/data-structures-algorithms', (req, res) => {
    res.render('data-structures-algorithms.ejs', { currentDate: currentDate });
});
app.get('/quantum-computing', (req, res) => {
    res.render('quantum-computing.ejs', { currentDate: currentDate });
});

app.get('/create-post', (req, res) => {
    res.render('createPostForm.ejs', { currentDate: currentDate });
});

app.post('/create-post', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : '';
    const newPost = {
        id: Date.now().toString(),
        title: title, 
        content: content,
        file: file,
        currentDate: currentDate 
    };

    const fileName = title.toLowerCase().split(' ').join('-') + '.ejs';
    const filePath = path.join(__dirname, 'views', 'posts', fileName);
    const ejsContent = `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI in Software Development</title>
    <link rel="stylesheet"F18000 href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../public/css/styles.css">
    <style>
        /* Additional CSS styles for article layout */
        .article {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .article h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        .article img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .article p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <%- include("../partials/header.ejs") %>
    <main>
        <section class="article">
            <img src="${file}" alt = ${title}>
            <h1>${title}</h1>
            <p>${content}</p>
        </section>
    </main>
    <footer>
    <div class="container">
       <h3 style = "text-decoration: none;" class = "footer-name">Yap</h3>
    <p style="font-size: 18px">Developed by Gabe.<br>Copyright © ${currentDate} - All Rights Reserved.</p>
    </div>
    <div>
      <a href = "www.linkedin.com/in/gabeeaton"><svg xmlns="http://www.w3.org/2000/svg" class = "icon" style="color: black" width="40" height="40" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
      </svg></a>
      <a href = "https://github.com/gabeeaton" style="color: black"><svg xmlns="http://www.w3.org/2000/svg" width="40"class = "icon" height="40" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
      </svg></a>
    </div>
</footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Include Bootstrap JavaScript bundle if needed -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
`;

    fs.writeFileSync(filePath, ejsContent, {currentDate});

    posts.unshift(newPost);
    res.render('view-posts', { posts: posts, title, content, file, currentDate, id: newPost.id });


});

app.get('/view-posts', (req, res) => {
    res.render('view-posts', { posts: posts, currentDate: currentDate });
});

app.get('/full-post/:title', (req, res) => {
    const title = req.params.title.split('-').join(' ');
    const post = posts.find(p => p.title.toLowerCase() === title.toLowerCase());
    if (post) {
        res.render(`posts/${title.toLowerCase().split(' ').join('-')}.ejs`);
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/www.linkedin.com/in/gabeeaton', (req, res) => {
    res.redirect('https://www.linkedin.com/in/gabeeaton');
});

app.get('/github.com/gabeeaton', (req, res) => {
    res.redirect('https://github.com/gabeeaton');
});

app.get('/edit-post/:id', (req, res) => {
    const postID = req.params.id;
    const { title, content } = req.body;
    for (let i = 0; i < posts.length; i++) {
            if(posts[i].id === postID){
                res.render("edit-post.ejs", {post: posts[i], currentDate: currentDate, title: title, content: content});
        }
    }
});

app.post('/edit-post/:id', upload.single('image'), (req, res) => {
    const postID = req.params.id;
     for (let i = 0; i < posts.length; i++) {
            if(posts[i].id === postID){
                const { title, content, existingImage } = req.body;
                const file = req.file ? `/uploads/${req.file.filename}` : '';

                posts[i].title = title;
                posts[i].content = content;

                if (req.file) {
                    if (existingImage) {
                        const imagePath = path.join(__dirname, existingImage);
                        fs.unlink(imagePath, err => {
                            if (err) console.error(`Error deleting old image file: ${err.message}`);
                        });
                    }
                    posts[i].file = `/uploads/${req.file.filename}`;

                } else {
                    posts[i].file = existingImage;
                }

                const fileName = title.toLowerCase().split(' ').join('-') + '.ejs';
                const filePath = path.join(__dirname, 'views', 'posts', fileName);

                res.redirect('/view-posts')
                res.render("edit-post.ejs", {post: posts[i], currentDate: currentDate, title: title, content: content, file: file});
        }
    };
});

app.get('/delete-post/:id', (req, res) => {
    const postID = req.params.id;
    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === postID){
            const deletedPost = posts.splice(i, 1)[0];
            const imagePath = path.join(__dirname, deletedPost.file);
            fs.unlink(imagePath, err => {
                if (err) console.error(`Error deleting image file: ${err.message}`);
            });
            const fileName = deletedPost.title.toLowerCase().split(' ').join('-') + '.ejs';
            const filePath = path.join(__dirname, 'views', 'posts', fileName);
            fs.unlink(filePath, err => {
                if (err) console.error(`Error deleting post file: ${err.message}`);
            });
            break;
        }
    }
    res.redirect('/view-posts');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
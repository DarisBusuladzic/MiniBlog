const firebaseConfig = {
  apiKey: "AIzaSyC7jPzH5-Mkp9DjiAHvYnJthhDDNuJydok",
  authDomain: "darisbusuladzic-561db.firebaseapp.com",
  databaseURL: "https://darisbusuladzic-561db-default-rtdb.firebaseio.com",
  projectId: "darisbusuladzic-561db",
  storageBucket: "darisbusuladzic-561db.appspot.com",
  messagingSenderId: "574644316338",
  appId: "1:574644316338:web:16b8aff7968417ec9a81ab"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();


const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");


postForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = document.getElementById("author").value;
    const date = new Date().toLocaleString();

    const newPostRef = database.ref("posts").push();
    newPostRef.set({
        title,
        content,
        author,
        date
    });

    postForm.reset();
});


const postsRef = database.ref("posts");
postsRef.on("value", function(snapshot) {
    postsContainer.innerHTML = "";
    const posts = snapshot.val();
    if(posts){
        for(let id in posts){
            const post = posts[id];
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>Autor: ${post.author} | Datum: ${post.date}</small><br>
                <button class="deleteBtn">Obriši</button>
            `;
            postDiv.querySelector(".deleteBtn").addEventListener("click", () => {
                database.ref("posts/" + id).remove();
            });
            postsContainer.appendChild(postDiv);
        }
    } else {
        postsContainer.innerHTML = "<p>Još nema objava.</p>";
    }
});

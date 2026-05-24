// ======================
// DATA
// ======================

let libraryFiles =
JSON.parse(
localStorage.getItem("libraryFiles")
) || [];

// ======================
// SAVE DATA
// ======================

function saveData(){

localStorage.setItem(
"libraryFiles",
JSON.stringify(libraryFiles)
);
}

// ======================
// RENDER FILES
// ======================

function renderFiles(){

let container =
document.getElementById(
"fileContainer"
);

container.innerHTML = "";

let search =
document.getElementById(
"searchInput"
).value.toLowerCase();

for(let i=0;i<libraryFiles.length;i++){

let file = libraryFiles[i];

if(

file.name
.toLowerCase()
.includes(search)

=== false

){

continue;
}

container.innerHTML +=

"<div class='fileCard "

+ (
file.favorite
? "favorite"
: ""
)

+ "'>"

+ "<h2>📄 "
+ file.name
+ "</h2>"

+ "<p>📘 Subject : "
+ file.subject
+ "</p>"

+ "<p>📁 Type : "
+ file.type
+ "</p>"

+ (
file.favorite
? "<p>⭐ Favorite</p>"
: ""
)

+ "<button onclick='openFile("
+ i
+ ")'>Open</button>"

+ "<button onclick='downloadFile("
+ i
+ ")'>Download</button>"

+ "<button onclick='deleteFile("
+ i
+ ")'>Delete</button>"

+ "</div>";
}
}

// ======================
// UPLOAD FILE
// ======================

document.getElementById(
"uploadBtn"
).onclick = function(){

let name =
document.getElementById(
"fileName"
).value.trim();

let subject =
document.getElementById(
"subject"
).value;

let fileInput =
document.getElementById(
"fileInput"
);

let favorite =
document.getElementById(
"favorite"
).checked;

let file =
fileInput.files[0];

if(

name===""

||

!file

){

alert(
"Enter File Details"
);

return;
}

let reader =
new FileReader();

reader.onload = function(e){

let data =
e.target.result;

libraryFiles.push({

name:name,

subject:subject,

type:file.type,

favorite:favorite,

data:data
});

saveData();

renderFiles();

document.getElementById(
"fileName"
).value = "";

document.getElementById(
"fileInput"
).value = "";

document.getElementById(
"favorite"
).checked = false;

alert(
"File Uploaded Successfully"
);
};

reader.readAsDataURL(file);
};

// ======================
// OPEN FILE
// ======================

function openFile(index){

let file =
libraryFiles[index];

let newWindow =
window.open();

newWindow.document.write(

"<iframe src='"

+ file.data

+ "' width='100%' height='100%'></iframe>"

);
}

// ======================
// DOWNLOAD FILE
// ======================

function downloadFile(index){

let file =
libraryFiles[index];

let a =
document.createElement("a");

a.href = file.data;

a.download = file.name;

a.click();
}

// ======================
// DELETE FILE
// ======================

function deleteFile(index){

libraryFiles.splice(index,1);

saveData();

renderFiles();
}

// ======================
// SEARCH
// ======================

document.getElementById(
"searchInput"
).onkeyup = function(){

renderFiles();
};

// ======================
// START
// ======================

renderFiles();
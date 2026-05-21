// ======================
// STORAGE
// ======================

let categories =
JSON.parse(localStorage.getItem("categories"))
|| [];

let currentCategoryId = null;

// ======================
// SAVE DATA
// ======================

function saveData(){

    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );
}

// ======================
// ADD CATEGORY
// ======================

document.getElementById(
    "addCategoryBtn"
).onclick = function(){

    let input =
    document.getElementById(
        "categoryInput"
    );

    let name =
    input.value.trim();

    if(name==="") return;

    categories.push({

        id:Date.now(),

        name:name,

        files:[]
    });

    input.value="";

    saveData();

    renderCategories();
};

// ======================
// RENDER CATEGORIES
// ======================

function renderCategories(){

    let container =
    document.getElementById(
        "categoriesContainer"
    );

    container.innerHTML="";

    categories.forEach(category=>{

        container.innerHTML += `

        <div class="card">

            <h2>
                📁 ${category.name}
            </h2>

            <p>
                Files:
                ${category.files.length}
            </p>

            <button
                onclick="openCategory(${category.id})"
            >
                Open
            </button>

            <button
                onclick="deleteCategory(${category.id})"
            >
                Delete
            </button>

        </div>
        `;
    });
}

// ======================
// DELETE CATEGORY
// ======================

function deleteCategory(id){

    let confirmDelete =
    confirm("Delete Category?");

    if(!confirmDelete) return;

    categories =
    categories.filter(
        category=>category.id!==id
    );

    saveData();

    renderCategories();
}

// ======================
// OPEN CATEGORY
// ======================

function openCategory(id){

    currentCategoryId = id;

    let category =
    categories.find(
        category=>category.id===id
    );

    document.getElementById(
        "homePage"
    ).style.display="none";

    document.getElementById(
        "dashboardPage"
    ).style.display="block";

    document.getElementById(
        "dashboardTitle"
    ).innerText =
    "📁 " + category.name;

    renderFiles();
}

// ======================
// BACK BUTTON
// ======================

document.getElementById(
    "backBtn"
).onclick = function(){

    document.getElementById(
        "dashboardPage"
    ).style.display="none";

    document.getElementById(
        "homePage"
    ).style.display="block";

    renderCategories();
};

// ======================
// UPLOAD FILE
// ======================

document.getElementById(
    "uploadBtn"
).onclick = function(){

    let fileInput =
    document.getElementById(
        "fileInput"
    );

    if(fileInput.files.length===0)
    return;

    let file =
    fileInput.files[0];

    let category =
    categories.find(
        category=>
        category.id===currentCategoryId
    );

    category.files.push({

        id:Date.now(),

        name:file.name,

        favorite:false
    });

    fileInput.value="";

    saveData();

    renderFiles();
};

// ======================
// RENDER FILES
// ======================

function renderFiles(){

    let container =
    document.getElementById(
        "filesContainer"
    );

    container.innerHTML="";

    let category =
    categories.find(
        category=>
        category.id===currentCategoryId
    );

    let files =
    [...category.files];

    // FAVORITES FIRST
    files.sort((a,b)=>
        b.favorite-a.favorite
    );

    files.forEach(file=>{

        container.innerHTML += `

        <div class="
            file
            ${file.favorite ? "favorite":""}
        ">

            <h3>
                ${file.favorite ? "⭐":""}
                📄 ${file.name}
            </h3>

            <button
                onclick="toggleFavorite(${file.id})"
            >

                ${file.favorite ? "Unfavorite":"Favorite"}

            </button>

            <button
                onclick="deleteFile(${file.id})"
            >
                Delete
            </button>

        </div>
        `;
    });
}

// ======================
// DELETE FILE
// ======================

function deleteFile(id){

    let category =
    categories.find(
        category=>
        category.id===currentCategoryId
    );

    category.files =
    category.files.filter(
        file=>file.id!==id
    );

    saveData();

    renderFiles();
}

// ======================
// FAVORITE FILE
// ======================

function toggleFavorite(id){

    let category =
    categories.find(
        category=>
        category.id===currentCategoryId
    );

    let file =
    category.files.find(
        file=>file.id===id
    );

    file.favorite = !file.favorite;

    saveData();

    renderFiles();
}

// ======================
// START
// ======================

renderCategories();
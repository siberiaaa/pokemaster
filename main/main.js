/* spinner */
function SpinnerOn(){
    document.documentElement.style.setProperty('--displayspinner', 'flex');
}

function SpinnerOff(){
    document.documentElement.style.setProperty('--displayspinner', 'none');
}


/*--------------- Log Out ---------------*/
function LogOut() {
    localStorage.removeItem('jwt');
    location.href = '../login/login.html';
}

const buttonLogOut = document.querySelector('#logout');
buttonLogOut.addEventListener('click', (e) => {
    e.preventDefault();
    LogOut();
});

/*--------------- modal advices behavior ---------------*/
const h2 = document.querySelector('.modal-content h2');

const modal = document.querySelector('article.modal');

const accept = document.querySelector('#accept');

function OpenModal() {
    document.documentElement.style.setProperty('--displaymodal', 'flex');
}

accept.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--displaymodal', 'none');
    LogOut();
});


/*--------------- modal show pokemon ---------------*/
const modalpoke = document.querySelector('article.modalpoke');

const modalpokecontent = document.querySelector('section.modalpoke-content');

function OpenModalPoke() {
    document.documentElement.style.setProperty('--displaymodalpoke', 'flex');
}


/*--------------- variables ---------------*/
let pokeArray = [];
const ul = document.querySelector('ul');
const searchInput = document.querySelector('#search');


/*---------------- Create Poke show ----------------*/
function CreatePokeShow(poke) {
    modalpokecontent.innerHTML = '';

    const img = document.createElement('img');

    if(poke['image'] == null){
        img.src = poke['imagen'];  //terrible
    }
    else{
        img.src = poke['image'];
        if (poke['estado'] == 0) {
            img.classList.add('filter');
        }
    }

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    p1.innerHTML = `Id: ${poke['id']}`;
    p2.innerHTML = `Name: ${poke['name']}`;


    const div1 = document.createElement('div');

    const p3 = document.createElement('p');
    const p4 = document.createElement('p');

    p3.innerHTML = `W: ${poke['weight']}`;
    p4.innerHTML = `H: ${poke['height']}`;

    div1.appendChild(p3);
    div1.appendChild(p4);

    let type1 = '';

    let type2 = '';
    let existsType2 = false;
    let type2index = '';

    for (let letter of poke['type']) {
        if (letter != ',') {
            type1 += letter;
        } else {
            existsType2 = true;
            break;
        }
    }

    if (existsType2) {
        for (let i = 0; i < poke['type'].length; i++) {
            if (poke['type'][i] == ',') {
                type2index = i;
            }
        }

        for (let i = type2index + 1; i < poke['type'].length; i++) {
            type2 += poke['type'][i];
        }
    }

    const div2 = document.createElement('div');

    const p5 = document.createElement('p');
    p5.innerHTML = type1;
    p5.classList.add('type');
    p5.classList.add(type1);
    div2.appendChild(p5);


    if (existsType2) {
        const p6 = document.createElement('p');
        p6.innerHTML = type2;
        p6.classList.add('type');
        p6.classList.add(type2);
        div2.appendChild(p6);
    }

    
    

    modalpokecontent.appendChild(img);
    modalpokecontent.appendChild(p1);
    modalpokecontent.appendChild(p2);
    modalpokecontent.appendChild(div1);
    modalpokecontent.appendChild(div2);
}

function AddAcceptButton(){
    const a = document.createElement('a');
    a.innerHTML = 'Accept';
    a.setAttribute('id', 'acceptpoke');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('eightbit-btn');
    a.classList.add('yellow-btn');

    a.addEventListener('click', (e) => {
        e.preventDefault();
        document.documentElement.style.setProperty('--displaymodalpoke', 'none');
    });

    modalpokecontent.appendChild(a);
}

function AddAcceptButtonRefresh(){
    const a = document.createElement('a');
    a.innerHTML = 'Accept';
    a.setAttribute('id', 'acceptpoke');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('eightbit-btn');

    a.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--displaymodalpoke', 'none');
    });

    modalpokecontent.appendChild(a);
}

/*--------------------------catch catch---------------------------------*/
async function CatchCatch(token) {

    const response = await fetch('https://graco-api.onrender.com/atrapar', {
        method: 'PUT',
        headers: { "Authorization": token,
        "Content-Type": "application/json"},
        body: JSON.stringify({id: catchPokeResult['id'], estado: 2})
    }); 
    

    if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
    }

    const data = await response.json();
    
    if (data['success']) {
        return true;
    } else {
        return false;
    }
}

async function OpenModalCatchCatch() {
    SpinnerOn();
    const result = await CatchCatch(localStorage.getItem('jwt'));

    const p1 = document.createElement('p');
    modalpokecontent.innerHTML = '';

    
    if(result){
        SpinnerOff();
        p1.innerHTML = 'Pokemon catched';
        

    }else{ 
        SpinnerOff();
        p1.innerHTML = 'Catch failed';
    }

    modalpokecontent.appendChild(p1);

    AddAcceptButtonRefresh();
}


function AddCancelCatchButton(){
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Do you wish to catch this pokemon?';
    modalpokecontent.appendChild(h1);

    const a = document.createElement('a');
    a.innerHTML = 'Cancel';
    a.setAttribute('id', 'cancelpoke');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('eightbit-btn');
    a.classList.add('red-btn');

    const a2 = document.createElement('a');
    a2.innerHTML = 'Catch';
    a2.setAttribute('id', 'catchpoke');
    a2.setAttribute('href', '');
    a2.setAttribute('draggable', 'false');
    a2.classList.add('eightbit-btn');
    a2.classList.add('green-btn');

    a.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--displaymodalpoke', 'none');
    });

    a2.addEventListener('click', (e) => {
        e.preventDefault();

        OpenModalCatchCatch();
    });

    const div = document.createElement('div');
    div.classList.add('wrap');
    div.appendChild(a2);
    div.appendChild(a);

    modalpokecontent.appendChild(div);
}


/* --------------------- Show Modal Poke------------------------*/
function ShowPokeModal(poke){
    CreatePokeShow(poke);
    AddAcceptButton();
    OpenModalPoke();
}

/*---------------- catch poke----------------*/

async function CatchPokemon(token) {
    const response = await fetch('https://graco-api.onrender.com/solicitarPokemon', {
        method: 'POST',
        headers: { "Authorization": token,
        "Content-Type": "application/json"}
    });
    

    if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
    }

    const data = await response.json();

    if (data['success']) {
        return data['data'];
    } else {
        return null;
    }
}


//to use in another fetch
let catchPokeResult = {};


async function OpenModalCatch() {
    SpinnerOn();
    const result = await CatchPokemon(localStorage.getItem('jwt'));
    if(result != null){
        catchPokeResult = {...result};
        CreatePokeShow(result);
        AddCancelCatchButton();

        SpinnerOff();
        OpenModalPoke();

    }else{
        SpinnerOff();
        h2.innerHTML = 'Error, log in again.';
        OpenModal();
    }
}

const buttonCatch = document.querySelector('#catchbutton');
buttonCatch.addEventListener('click', (e) => {
    e.preventDefault();
    OpenModalCatch();
});

/* --------------------- Return poke from array id------------------------*/

//id = 'id: 1'
function ReturnPokeFromId(id){
    const poke = pokeArray.filter((e) => `Id: ${e['id']}` == id);
    return poke[0];
}

/*---------------- Create li ----------------*/

function createLi(poke) {
    const li = document.createElement('li');

    const section = document.createElement('section');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    p1.innerHTML = `Id: ${poke['id']}`;
    p2.innerHTML = `Name: ${poke['name']}`;

    const div = document.createElement('div');

    const p3 = document.createElement('p');


    /* li event listener to show pokemon*/
    

    li.addEventListener('click', () => {
        ShowPokeModal(ReturnPokeFromId(p1.innerHTML));
    });


    /*---------------- Supuestamente los tipos no venían en array? ----------------*/
    let type1 = '';

    let type2 = '';
    let existsType2 = false;
    let type2index = '';

    for (let letter of poke['type']) {
        if (letter != ',') {
            type1 += letter;
        } else {
            existsType2 = true;
            break;
        }
    }

    if (existsType2) {
        for (let i = 0; i < poke['type'].length; i++) {
            if (poke['type'][i] == ',') {
                type2index = i;
            }
        }

        for (let i = type2index + 1; i < poke['type'].length; i++) {
            type2 += poke['type'][i];
        }
    }

    p3.innerHTML = type1;
    p3.classList.add(type1);
    div.appendChild(p3);

    if (existsType2) {
        const p4 = document.createElement('p');
        p4.innerHTML = type2;
        p4.classList.add(type2);
        div.appendChild(p4);
    }

    section.appendChild(p1);
    section.appendChild(p2);
    section.appendChild(div);

    const img = document.createElement('img');
    img.src = poke['image'];

    if (poke['estado'] == 0) {
        img.classList.add('filter');
    }

    li.appendChild(section);
    li.appendChild(img);

    ul.appendChild(li);
}

/*---------------- Fill pokeArray ----------------*/

async function getPokedex(token) {
    const response = await fetch('https://graco-api.onrender.com/pokedex', {
        method: 'GET',
        headers: { Authorization: token },
    });

    if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
    }

    const data = await response.json();

    if (data.data.length > 0) {
        pokeArray = [...data.data];
        return true;
    } else {
        return false;
    }
}

async function fillPokedex() {
    SpinnerOn();

    searchInput.innerHTML = ''; //input

    const result = await getPokedex(localStorage.getItem('jwt'));

    if (result) {
        const catched = pokeArray.filter((e) => e['estado'] == 2);
        const seen = pokeArray.filter((e) => e['estado'] == 1);
        const unknow = pokeArray.filter((e) => e['estado'] == 0);

        SpinnerOff();

        for (let poke of catched) {
            createLi(poke);
        }
        for (let poke of seen) {
            createLi(poke);
        }
        for (let poke of unknow) {
            createLi(poke);
        }
    } else {
        SpinnerOff();
        h2.innerHTML = 'Error, log in again.';
        OpenModal();
    }
}

/*---------------- search ----------------*/

function updateArrayShow(e) {
    const search = e.srcElement.value;

    if(pokeArray.length == 0){
        return;
    }

    if(search.length == 0){
        ul.innerHTML = '';

        const catched = pokeArray.filter((e) => e['estado'] == 2);
        const seen = pokeArray.filter((e) => e['estado'] == 1);
        const unknow = pokeArray.filter((e) => e['estado'] == 0);

        for (let poke of catched) {
            createLi(poke);
        }
        for (let poke of seen) {
            createLi(poke);
        }
        for (let poke of unknow) {
            createLi(poke);
        }
        return;
    }
    
    

    const filtered = pokeArray.filter( (e) => e['name'].includes(search) ||
            e['type'].includes(search) ||  e['id'].includes(search));

    ul.innerHTML = '';

    if (filtered.length == 0) {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = 'Not found.';
        li.appendChild(p);
        ul.appendChild(li);
        return;
    }

    for (let poke of filtered) {
        createLi(poke);
    }
}


searchInput.addEventListener('input', updateArrayShow);








/*---------------- load page ----------------*/
fillPokedex();









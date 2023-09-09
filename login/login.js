/* spinner */
function SpinnerOn(){
    document.documentElement.style.setProperty('--displayspinner', 'flex');
}

function SpinnerOff(){
    document.documentElement.style.setProperty('--displayspinner', 'none');
}


/*--------------- modal behavior ---------------*/
const sectionmodal = document.querySelector('section.modal-content');

const h2 = document.querySelector('.modal-content h2');

const modal = document.querySelector('article.modal');

const forgot = document.querySelector('#forgot');

const accept = document.querySelector('#accept');

forgot.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--displaymodal', 'flex');
});

accept.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--displaymodal', 'none');
});

function OpenModal() {
    document.documentElement.style.setProperty('--displaymodal', 'flex');
}

/*-------- Prevent default sumbit --------*/
const form = document.querySelector('form');

form.addEventListener('submit', (e) => e.preventDefault());

/* ---------- modal create ----------- */

function ModalCreate(){
    sectionmodal.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Login successful';
    sectionmodal.appendChild(h2);


    const a = document.createElement('a');
    a.innerHTML = 'Accept';
    a.setAttribute('id', 'accept');
    a.setAttribute('href', '');
    a.setAttribute('draggable', 'false');
    a.classList.add('eightbit-btn');
    a.classList.add('red-btn');

    a.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--displaymodal', 'none');
    location.href = "../main/main.html";
    });

    sectionmodal.appendChild(a);
}


/*---------------- Log in ----------------*/

async function LogInAPI(email, pass) {
    const response = await fetch('https://graco-api.onrender.com/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email': email, 'password': pass})
    });

    console.log(response)
    if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
    }

    const data = await response.json();

    if (data['success']) {
        return data['data']['token'];
    } else {
        return null;
    }
}

async function LogIn(e) {
    e.preventDefault();
    SpinnerOn();
    

    const data = new FormData(form);

    const email = data.get('email');
    const pass = data.get('password');

    if (!email || !pass) {
        SpinnerOff();
        h2.innerHTML = 'Please fill out all fields.';
        OpenModal();
        return;
    }
    
    const token = await LogInAPI(email, pass);
    
    
    if(token != null){
        form.reset();
        localStorage.setItem('jwt', token);

        ModalCreate();
        SpinnerOff();
        OpenModal();
    }
    else{
        
        SpinnerOff();
        h2.innerHTML = 'Error';
        
        OpenModal();
    }

}

/*----- button -----*/
const button = document.querySelector('#login');
button.addEventListener('click', (e) => LogIn(e));

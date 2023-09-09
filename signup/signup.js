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

const accept = document.querySelector('#accept');

function OpenModal() {
    document.documentElement.style.setProperty('--displaymodal', 'flex');
}


accept.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--displaymodal', 'none');
});


/*-------- Prevent default sumbit --------*/
const form = document.querySelector('form');

form.addEventListener('submit', (e) => e.preventDefault());

/* ---------- modal create ----------- */

function ModalCreate(){
    sectionmodal.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Signed up successfully';
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
    location.href = "../login.html";
    });

    sectionmodal.appendChild(a);
}

/*---------------- Sign up ----------------*/

async function Register(name, last, email, pass) {
    const response = await fetch('https://graco-api.onrender.com/registrar', {
        method: 'POST',
        headers:  {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({ 'name': name, 'lastname': last, 'email': email, 'password': pass })
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

async function SignUp(e) {
    e.preventDefault();

    SpinnerOn();

    const data = new FormData(form);

    const name = data.get('name');
    const last = data.get('lastname');
    const email = data.get('email');
    const pass = data.get('password');

    if (!name || !last || !email || !pass) {
        SpinnerOff();
        h2.innerHTML = 'Please fill out all fields.';
        OpenModal();
        return;
    }
    
    const registered = await Register(name, last, email, pass);

    if(registered){
        form.reset();
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
const button = document.querySelector('#singup');
button.addEventListener('click', (e) => SignUp(e));


//THIS IS MY GET FUNCTION FOR A FRONTEND INSTED OF USING POSTMAN - JUST CHANGE URL IN THE FETCH METHOD
//get members id
const getMembers = async (urlId) => {
    try {
        const result = await fetch(`http://localhost:5000/api/members/${urlId}`);
        const data = await result.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

document.getElementById('display').addEventListener('click',  displayMembers);



async function displayMembers (e) {
    e.preventDefault();
    const display = document.getElementById('display-data');
    const id = document.getElementById('user_id').value;
    const members = await getMembers(id);
    display.innerHTML = members.map(member => `${member.name}`);
} 

//======================================================
//TO CREATE MEMBER WE CAN USE POST METHOD OF FETCH

const submit = document.getElementById('submit');
const name = document.getElementById('name');
const email = document.getElementById('email');

submit.addEventListener('click', async (e) => {
e.preventDefault();

//POST to server
await fetch(`http://localhost:5000/api/members`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            name: name.value,
            email: email.value
    })
});

});

//========================================================
//To update member 

const update = document.getElementById('update');

update.addEventListener('click', async (e) => {
e.preventDefault();

const id = document.getElementById('user_id').value;
//UPDATE server
await fetch(`http://localhost:5000/api/members/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            name: name.value,
            email: email.value
    })
});

});

//========================================================
//DELETE MEMBER
const deleteBtn = document.getElementById('delete');

deleteBtn.addEventListener('click', async (e) => {
e.preventDefault();

const id = document.getElementById('user_id').value;
//UPDATE server
await fetch(`http://localhost:5000/api/members/${id}`, {
    method: 'DELETE'
});

});
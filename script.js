const list = document.querySelector('.list');
const input = document.getElementById('input');


const URL = 'http://hp-api.herokuapp.com/api/characters';
// let resonse = [];


input.addEventListener('keyup',function(e) {
    const target = e.target.value.toLowerCase();
    const sliced = target.slice(1,-1);
    const cap = target.charAt(0).toUpperCase();
    const combine = cap+sliced;
    const filtedData = resonse.filter(character => {
        return (
            character.name.includes(combine) || 
            character.name === target ||
            character.house === target ||
            character.house.includes(combine));
    })
    getData(filtedData);
})

async function apiRequest() {
    try{
        const request = await fetch(URL);
        resonse = await request.json();
        getData(resonse);
    } catch(err){
        console.log(err)
    }
    
}

function getData (data){
    // const sliced = data.slice(0,15);
    const listItmes= data.map((character,index) => {
        const {name,house,image } = character;
        // if(house === '') {
        //     data.splice(index,index + 1)
        // }
            return(
                `<li>
                    <div class="info-wrapper">
                        <div class="info">
                            <h3>${name}</h3>
                            <p>house: <span>${house}</span></p>
                        </div>
                        <img src=${image} alt=""> 
                    </div>
                </li>`
            )
    }).join('');
    list.innerHTML = listItmes;
}

apiRequest();

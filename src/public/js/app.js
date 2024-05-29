
const getWether = (address,callback)=>{
    fetch('http://api.weatherapi.com/v1/current.json?key=e19d220b7adf4cc3821165343240705&q='+address).then((responce)=>{  
        responce.json().then((data)=>{
            if(data.error)
                callback(data.error.message,null)
                else
                callback(null,data.current.temp_c)
            })
        })
}

const weatherForm = document.querySelector('form');
const searchValue= document.querySelector('input');
const messagrOne = document.querySelector('#meaageOne');
const messageTwo = document.querySelector('#meaageTwo')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value = searchValue.value;
    messagrOne.textContent='Lodding...';
    
    messageTwo.textContent='';
    if(!value)
       return messagrOne.textContent='Error: '+ 'Please enter address';
    getWether(value,(error,responce)=>{
if(error){
    console.log('Error',error);
    messagrOne.textContent='Error: '+ error;
}
if(responce){
    messagrOne.textContent='';
    messageTwo.innerHTML= 'Responce: ' + value + ' Temperature is ' + responce;
    console.log('responce',responce);
}
    })
})
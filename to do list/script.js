const inputEL=document.getElementById("input");
const buttonEL=document.getElementById("btn-search");
const errorEL=document.getElementById("error");
const heading=document.getElementById("h5");
const ListEL=document.getElementById("list-container");
let toggleModeBtn = document.getElementById("toggleModeBtn");

buttonEL.addEventListener('click' , function(e){
 const inputText = inputEL.value.trim();
 if(inputText.length <= 0)
 {
    showerror();
    return false;
 }
 ////////////////////creating h5 tag ////////////////////
 const li = document.createElement("li");
 ListEL.appendChild(li); 

 const p = document.createElement("p");
 p.innerText =inputText ; 
 li.appendChild(p); 

 const spanEl = document.createElement("span"); 
 spanEl.innerHTML= '\u00d7'; 
 li.appendChild(spanEl); 
 
 


 inputEL.value=' ';
 saveTOLocalStorage(inputText);
});


    ListEL.addEventListener('click' , function(e)
 {
    
    if(e.target.tagName === 'P')
    {
        
        e.target.classList.toggle("checked");
    }
  if(e.target.tagName === 'SPAN')
    {
        console.log(e.target);
       e.target.parentElement.remove();
       deletefromLocalStorage(e.target.parentElement);
    }

 },false)

///////////////////////////////error functions //////////
const showerror = () =>
{
    errorEL.style.display = 'block';
    setTimeout(() => {
        clearError();
    }, 2000);
}
const clearError = () =>
{
    errorEL.style.display = 'none';
}

toggleModeBtn.addEventListener('click', function() {
    const todoElement = document.querySelector(".To-do");
      todoElement.classList.toggle('dark-mode');

  });
  
  
  
///////////////////////////local storage
const saveTOLocalStorage = (toDo) =>
{
    let todos ;
    if( localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(toDo);
    localStorage.setItem("todos" , JSON.stringify(todos));
    
}

const getLocalToDo = () => { 
    let todos; 
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    // Clear the existing list before appending new items
    ListEL.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement("li");
        ListEL.appendChild(li); 
       
        const p = document.createElement("p");
        p.innerText = todo; 
        li.appendChild(p); 

        const spanEl = document.createElement("span"); 
        spanEl.innerHTML = '\u00d7'; 
        li.appendChild(spanEl); 
    
        
    });
}


document.addEventListener('DOMContentLoaded' , getLocalToDo());


const deletefromLocalStorage = (todo) =>
{
    let todos ;
    if( localStorage.getItem("todos")=== null)
    {
        todos = [];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    let todoText =todo.children[0].innerText;
    let todoIndex =todos.indexOf(todoText);
    todos.splice (todoIndex , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
;
}
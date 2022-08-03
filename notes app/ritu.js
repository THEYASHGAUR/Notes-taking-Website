// declaration part
const addBox = document.querySelector('.add-box');
edit = document.querySelector('.edit');
popupBox = document.querySelector('.popup-box');
closeIcon = popupBox.querySelector('header i');
titleTag = popupBox.querySelector('input');
descTag = popupBox.querySelector('textarea');
addbtn = popupBox.querySelector('button');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'Auguest', 'September', 'October', 'November', 'December'];


// getting localstoage notes if exist and parsing them 
// to js object else passign an empty array to notes
const notes = JSON.parse(localStorage.getItem('notes') || '[]');


/*
logic part starts from here
*/


// to make add new note box functional
addBox.addEventListener('click', function () {
    popupBox.classList.add('show');
});

// to close the popup box 
closeIcon.addEventListener('click', function () {
    titleTag.value = '';
    descTag.value = '';
    popupBox.classList.remove('show');
});

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note , index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                
                                <ul class="menu">
                                <li onclick="updateNote('${index}','${note.title}','${note.description}')"><i  class="uil uil-pen" class="edit"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete </li>
                                </ul>
                            </div>

                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend' , liTag);
        
    });
}
showNotes();
console.log("hi");

function updateNote(noteId,title,desc){
    isUpdate = true ; 
    addBox.click();
    updateId = noteId;
    titleTag.value = title;
    descTag.value = desc;
    addbtn.innerText = "Update a note " ;
    popupTitle.innerText = "Update a new  note" ;
    console.log(noteId,title,desc);
    popupBox.classList.remove('show');
}


function deleteNote(noteId){
    notes.splice(noteId , 1);//removing selected note from array/tasks
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
   
}

function showMenu(elem){
    // console.log(elem.parentElement);
    elem.parentElement.classList.add('show');
    document.addEventListener('click' , function(e){
        // removing show classfrom the setting menu on document click
        if(e.target.tagName !='I' || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    })
}

addbtn.addEventListener('click', function (e) {
    e.preventDefault();

    let notetitle = titleTag.value,
        notedesc = descTag.value;

    if (notetitle || notedesc) {
        // getting month , day , year from the current date
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();


        let noteinfo = {
            title: notetitle,
            description: notedesc,
            date: `${month} ${day} ${year}`
        }
        notes.push(noteinfo); //adding new note to notes
        // saving notes to the local storage
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});
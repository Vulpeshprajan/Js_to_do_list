
const taskLists = [];
const badTaskLists = [];
const hrWeek = 168

let taskListHrs = 0; 

let badTaskListHrs = 0;

const handleOnSubmit = (e) => {

const formData = new FormData(e); 

const task = formData.get("add")
const hr = formData.get("hr")

const item = {
  task,
  hr 
}
taskListHrs = taskLists.reduce((subttl, item) => (subttl += +item.hr), 0)

if (taskListHrs + +hr > hrWeek){
  return alert ("Sorry you ran out of hrs");

}

document.getElementById("totalHrs").innerText = taskListHrs + +hr;


taskLists.push(item); 
displayTaskLists(); 



}


// display functions

// displaying task list 
const displayTaskLists = () => {
    let tasks = "";
   
    taskLists.map((item, i) => {
      tasks += `
         <table class="table table-border border-light  rounded">
         
                    <tbody>
                      <tr>
                        <td> <input type="checkbox" /> ${item.task}</td>
                        <td>  ${item.hr}hr/w</td>
                      <td>  <button onclick = "markAsNotToDo(${i})" class="btn-sm bg-primary rounded"><i class="fas fa-plus"></i> NTD</button></td>
                        <td></td>
                      <td>  <button onclick = "deleteItem(${i})" class="btn-sm bg-danger rounded-pill"><i class="fas fa-minus-circle"></i> </button></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table><br>
    
      `  
    })
      document.getElementById("todo").innerHTML = tasks; 


    }




const displayNotTDTasks = () => {
    let tasks = "";
   
    badTaskLists.map((item, i) => {
      tasks += `
         <table class="table table-border border-light  rounded">
         
                    <tbody>
                      <tr>
                        <td><input type="checkbox" /> ${item.task}</td>
                         <td>  ${item.hr}hr/w</td>
                        <td> <button onclick = "markAsToDo(${i})" class="btn-sm bg-primary rounded"><i class="fas fa-plus"></i> To-Do</button></td>
                        <td></td>
                         <td>  <button onclick = "deleteItemNt(${i})" class="btn-sm bg-danger rounded-pill"><i class="fas fa-minus-circle"></i> </button></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table><br>
    
      `  
    })
      document.getElementById("ntd").innerHTML = tasks; 
totalBadHours(); 


    }








// mark as not to do list 
    const markAsNotToDo = i => {

      const item = taskLists.splice(i, 1)[0]

      badTaskLists.push(item); 

      displayTaskLists(); 
      displayNotTDTasks();
      totalTaskHours();

    }

    const markAsToDo = i => {

      const item = badTaskLists.splice(i, 1)[0];

      taskLists.push(item); 

      displayTaskLists();  
      displayNotTDTasks(); 
      totalTaskHours();

        

    }


    const deleteItem = i => {
        taskLists.splice(i, 1); 
       
        displayTaskLists(); 
        totalTaskHours(); 
    

    }

    const deleteItemNt = i => {
       badTaskLists.splice(i, 1); 
           displayNotTDTasks(); 

    }



    // calculate bad hrs 

    const totalBadHours = () => {

        const total = badTaskLists.reduce ((subttl, item ) => ( subttl += +item.hr), 0 )

        document.getElementById("totalBadHrs").innerText = total;

    }



    const totalTaskHours = () => {

        const total = taskLists.reduce ((subttl, item ) => ( subttl += +item.hr), 0 )

        document.getElementById("totalHrs").innerText = total;

    }





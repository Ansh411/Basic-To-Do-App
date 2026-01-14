const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const count = document.querySelector('#count');
const empty = document.querySelector('.empty');
const filters = document.querySelectorAll('.filters button');
const clearBtn = document.querySelector('#clear');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function render(){
  list.innerHTML = '';
  const filtered = tasks.filter(t =>
    filter === 'all' ||
    (filter === 'active' && !t.done) ||
    (filter === 'completed' && t.done)
  );

  filtered.forEach((t,i)=>{
    const li = document.createElement('li');
    li.className = `task ${t.done?'completed':''}`;
    li.innerHTML = `
      <div>
        <strong>${t.text}</strong>
        <div class="priority ${t.priority}">${t.priority}</div>
      </div>
      <div class="actions">
        <button onclick="toggle(${i})">✔</button>
        <button onclick="removeTask(${i})">✖</button>
      </div>`;
    list.appendChild(li);
  });

  empty.style.display = filtered.length ? 'none':'block';
  count.textContent = `${tasks.length} tasks`;
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function addTask(e){
  e.preventDefault();
  if(!input.value.trim())return;
  tasks.push({
    text:input.value,
    priority:priority.value,
    done:false
  });
  input.value='';
  render();
}

function toggle(i){tasks[i].done=!tasks[i].done;render();}
function removeTask(i){tasks.splice(i,1);render();}

filters.forEach(b=>b.onclick=()=>{
  filters.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  filter=b.dataset.filter;render();
});

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.done);
  render();
});

document.querySelector('#task-form').addEventListener('submit',addTask);
render();
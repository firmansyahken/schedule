class Schedule {
  constructor() {
    this.dataDay = ["minggu", "senin", " selasa", "rabu", "kamis", "jumat", "sabtu"]
    this.data = {
      "data": [
        {
          "minggu":[], 
          "senin": [],
          "selasa": [],
          "rabu": [],
          "kamis": [],
          "jumat": [],
          "sabtu": []
        }
      ]
    }
    
    this.schedules = JSON.parse(localStorage.getItem("schedules")) || this.data;
    this.now = this.dataDay[new Date().getDay()];
    this.active = this.now
    this.Render(this.now);
    this.onActive(this.now)
  }
  
  validation = val => {
    if(val === null || val === "") {
      return false;
    }
    return true;
  }
  
  create = val => {
    if(this.validation(val)) {
      this.schedules.data[0][this.active].push(val)
      this.store()
    }
  }
  
  update = id => {
    let value = prompt("Edit Schedule", this.schedules.data[0][this.active][id]);
    if(this.validation(value)) {
      this.schedules.data[0][this.active][id] = value;
      this.store();
    }
  }
  
  remove = id => {
    this.schedules.data[0][this.active].splice(id, 1);
    this.store()
  }
  
  store = () => {
    localStorage.setItem("schedules", JSON.stringify(this.schedules));
    this.Render(this.active);
  }
  
  onActive = day => {
    document.querySelector(`[data-id="${day}"]`).classList.add("active");
    this.active = day;
  }
  
  Render = day => {
    this.template = "";
    this.schedules.data[0][day].map((schedule, index) => {
      this.template += `<div class="item">
        <p onclick='schedule.update(${index})'>${schedule}</p>
        <p onclick='schedule.remove(${index})'>&times</p>
      </div>`
    }); 
    
    document.querySelector(".main").innerHTML = this.template;
  }
}

const schedule = new Schedule();
var days = document.querySelectorAll(".day");
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dataDayEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();

document.getElementById('year').innerText = date.getFullYear();
document.getElementById('month').innerText = months[date.getMonth()];
document.getElementById('date').innerText = date.getDate();
document.getElementById('day').innerText = dataDayEn[date.getDay()];

days.forEach(day => {
  day.addEventListener("click", function() {
    days.forEach(day => day.classList.remove("active"));
    schedule.Render(this.dataset.id);
    schedule.onActive(this.dataset.id);
  }) 
})

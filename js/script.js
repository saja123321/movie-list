let category = document.getElementById('category');
let form = document.getElementById('movie');
let table = document.getElementById('table');
let categorys = ['Action', 'Adventure', 'Animation', 'Comedy', 'Detective', 'Fantasy', 'History', 'Horror', 'Musical', 'Pirate', 'Romantic', 'SCI-FI', 'War', 'Western'];
fillCategory();
function fillCategory() {
  categorys.forEach(element => {
    let opt = document.createElement('option');
    opt.value = element;
    opt.textContent = element;
    category.appendChild(opt);
  });
}

function Movie(name, category, issueYear) {
  this.name = name;
  this.category = category;
  this.issueYear = issueYear;
  Movie.allMovie.push(this);
}
Movie.allMovie = [];

Movie.prototype.render = function () {
  console.log(this);
  let row = document.createElement('tr');
  table.appendChild(row);

  let remove = document.createElement('td');
  remove.textContent = 'X';
  remove.id = 'remove';
  row.appendChild(remove);

  let tdImg = document.createElement('td');
  row.appendChild(tdImg);
  let img = document.createElement('img');
  img.src = `./img/${this.category}.png`;
  img.id = 'categoryImg';
  tdImg.appendChild(img);

  let nameTd = document.createElement('td');
  nameTd.textContent = this.name;
  console.log(this.name);
  row.appendChild(nameTd);

  let issueTd = document.createElement('td');
  issueTd.textContent = this.issueYear;
  row.appendChild(issueTd);
};
getData();
form.addEventListener('submit', saveMovie);
function saveMovie(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let cat = e.target.category.value;
  let issue = e.target.issueYear.value;

  let newObj = new Movie(name, cat, issue);
  newObj.render();
  setData();


}

function setData(){
  localStorage.movie = JSON.stringify(Movie.allMovie);
}
function getData(){
  if(localStorage.movie){
    let data = JSON.parse(localStorage.movie);
    data.forEach(element => {
      let newObj = new Movie(element.name , element.category , element.issueYear);
      newObj.render();
    });
  }
}

function clearData(){
  Movie.allMovie = [];
  setData();
  window.location.reload();
}
table.addEventListener('click' , removeItem);
function removeItem(e){
  if(e.target.textContent === 'X'){
   
    let index = e.target.parentElement.rowIndex;
    console.log(index);
    Movie.allMovie.splice(index , 1);
    setData(); 
    e.target.parentElement.remove();
  }


}

'use strict';

var resultEl = document.getElementById('results');
var containerEl = document.getElementById('container');
var numberOfImg = 3;
var totalClick = 0;
var maxClick = 25;
var indexArr = [];
var allItems = [];
var filepathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Product (name, pathway){
  this.name = name;
  this.pathway = pathway;
  this.votes = 0;
  this.views = 0;

  allItems.push(this);
}

function addElement(element, content, parent){
  var newElement = document.createElement(element);
  if(content){
    var newContent = document.createTextNode(content);
    newElement.appendChild(newContent);
  }

  parent.appendChild(newElement);
  return newElement;
}

Product.prototype.renderImage = function(parent){
  var imageEl = document.createElement('img');
  imageEl.src = this.pathway;
  imageEl.alt = this.name;
  imageEl.title = this.name;
  parent.appendChild(imageEl);
  this.views ++;
  return imageEl;
};

function random(max){
  return Math.floor(Math.random() * (max));
}

function createIndex() {
  var index = random(allItems.length);
  while (indexArr.includes(index)) {
    index = random(allItems.length);
  }
  while (indexArr.length >= numberOfImg * 2) {
    indexArr.shift();
  }
  indexArr.push(index);
  return index;
}

function generatePicture() {
  var index = createIndex();
  var newEl = allItems[index].renderImage(containerEl);
  console.log('new element', newEl);
  return newEl;
}

function renderAllPictures() {
  while(containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  for (var i = 0; i < numberOfImg; i++) {
    generatePicture();
  }
}

function eventClick(e) {
  totalClick++;
  for (var i = 0; i < allItems.length; i++) {
    if (e.target.title === allItems[i].name) {
      allItems[i].votes++;
    }
  }
  if (totalClick >= maxClick) {
    containerEl.removeEventListener('click', eventClick);
    addResult();
  }
  renderAllPictures();
}

function addResult(){
  addElement('h3', 'You got it!', resultEl);
  var ulEl = addElement ('ul', false, resultEl);
  for (var i = 0; i < allItems.length; i++) {
    addElement('li', textContent, ulEl);
    var textContent = allItems[i].name + ' got ' + allItems[i].views + ' views and ' + allItems[i].votes + ' votes;';
  }
}

for (var i = 0; i < filepathArr.length; i++) {
  new Product(names[i],filepathArr[i]);
}

renderAllPictures();

containerEl.addEventListener('click', eventClick);





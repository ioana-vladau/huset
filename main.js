function getAllEvents() {
    fetch("http://ioanavladau.com/wp/wp-json/wp/v2/events?_embed&per_page=11")
        .then(res => res.json())
        .then(showEvents);
}

function getAllEventsByCategory(id) {
    fetch("http://ioanavladau.com/wp/wp-json/wp/v2/events?_embed&categories=" + id)
        .then(res => res.json())
        .then(showEvents);
}

///// GET ALL EVENTS BY TAG
function getAllEventsByTag(id) {
    fetch("http://ioanavladau.com/wp/wp-json/wp/v2/events?_embed&per_page=11&tags=" + id)
        .then(res => res.json())
        .then(showEvents);
}


function getSingleEventById(myId){
    console.log(myId);
     fetch("http://ioanavladau.com/wp/wp-json/wp/v2/events/" + myId + "/?_embed")
        .then(res => res.json())
        .then(showSingleEvent);
}

function getMenu(){
    fetch("http://ioanavladau.com/wp/wp-json/wp/v2/categories?per_page=15")
    .then(e=>e.json())
    .then(showMenu);
}

//categories or tags
//if page has id, show tag list, else show full list

function showMenu(categories){
    console.log(categories);
    //lt - link template
    let lt = document.querySelector("#linkTemplate").content;
    categories.forEach(function(category){

        //if a category doesn't contain anything, don't show it
        if(category.count > 0){
        let clone = lt.cloneNode(true);
        let parent = document.querySelector("#categorymenu");
        clone.querySelector("a").textContent=category.name;
        clone.querySelector("a").setAttribute("href", "index.html?categoryid="+category.id);
        parent.appendChild(clone);
        }

    });

    //http://ioanavladau.com/wp/wp-json/wp/v2/events?categories=8

}


///// FETCHING TAGS FOR TAGS MENU
function getTagsMenu(){
    fetch("http://ioanavladau.com/wp/wp-json/wp/v2/tags")
    .then(e=>e.json())
    .then(showTagsMenu);
}

///// SHOW TAGS MENU
function showTagsMenu(tags){
    console.log(tags);
    //link template tags
    let lttags = document.querySelector("#linkTemplateTags").content;
    tags.forEach(function(tag){

        if(tag.count > 0){
            let clone = lttags.cloneNode(true);
            let parent = document.querySelector("#tagmenu");
            clone.querySelector("a").textContent = tag.name;
            clone.querySelector("a").setAttribute("href", "index.html?tagid="+tag.id);
            parent.appendChild(clone);
        }
    });
}



function showSingleEvent(json){
    console.log(json);
    document.querySelector("#single h1").textContent = json.title.rendered;
    document.querySelector("#single .price span").textContent = json.acf.price;
//    let h1 = document.querySelector("#single h1");
//    h1.textContent = "Hi mom";
}


function showEvents(data) {
    //console.log(data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;

    data.forEach(function (theEvent) {
        console.log(theEvent)
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price");
        let date = clone.querySelector(".date");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");
        let priceDateTime = clone.querySelector(".price-date-time");
        let dateTime = clone.querySelector(".date-time");
        let startTime = clone.querySelector(".time");
        let type = clone.querySelector(".type");

        title.textContent = theEvent.title.rendered;
//        excerpt.innerHTML = theEvent.excerpt.rendered;
        price.textContent = theEvent.acf.price;
//        date.textContent = theEvent.acf.date;

//        startTime.textContent = theEvent.acf.start_time;
        dateTime.textContent = theEvent.acf.date + " at " + theEvent.acf.start_time;
//        console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
         img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

        link.setAttribute("href", "event.html?id="+theEvent.id);

        list.appendChild(clone);
    })

}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categoryid = searchParams.get("categoryid");
let tagid = searchParams.get("tagid");
//console.log(id);

getMenu();
getTagsMenu();

if(id){
    getSingleEventById(id);
}
else if(categoryid){
    getAllEventsByCategory(categoryid);
}
else if(tagid){
    getAllEventsByTag(tagid);
}else{
    getAllEvents();
}

//route - if this is true, go here, if not, go there


function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

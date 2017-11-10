function getSingleEventById(myId){
    console.log(myId);
     fetch("http://ioanavladau.com/wp/wp-json/wp/v2/events/" + myId + "/?_embed")
        .then(res => res.json())
        .then(showSingleEvent);
}

function getMenu(){
    fetch("http://ioanavladau.com/wp/wp-json/wp/v2/categories")
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
        clone.querySelector("a").setAttribute("href", "index.html?categoryid="+category.id)
        parent.appendChild(clone);

        }
    });

    //http://ioanavladau.com/wp/wp-json/wp/v2/events?categories=8

}

function showSingleEvent(json){
    console.log(json);
    document.querySelector("#single h1").textContent = json.title.rendered;
    document.querySelector("#single .date span").textContent = json.acf.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
    document.querySelector("#single .price span").textContent = json.acf.price;
    let img = document.querySelector("img");
    img.setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector("#single .location span").textContent = json.acf.location;
    document.querySelector("#single .start-time span").textContent = json.acf.start_time;


//    let h1 = document.querySelector("#single h1");
//    h1.textContent = "Hi mom";
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categoryid = searchParams.get("categoryid");
//console.log(id);

getMenu();
getSingleEventById(id);

//route - if this is true, go here, if not, go there


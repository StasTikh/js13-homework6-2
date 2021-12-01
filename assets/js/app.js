const marketURL = "https://fakestoreapi.com/products";

let model = {
    search: '',
    sort: null,
    renderList: function(){
        let s = this.search
                    .trim()
                    .toLowerCase();
        let resultList = this.stuff.filter(function(item){
            let txt = item.title.toLowerCase();
            let descr = item.description.toLowerCase();
            return txt.includes(s) || descr.includes(s);
        });
        
        if(this.sort != null){
            if(this.sort){
                resultList.sort((a, b) => a.price - b.price);
            } else {
                resultList.sort((a, b) => b.price - a.price);
            }
        }
        let tag = document.querySelector('#marketPlace');
      
        if(resultList.length) {  
            tag.innerHTML = resultList.map(item => `
                            <div class="card m-2 shadow p-3 mb-5 bg-white rounded">
                                    <img src="${item.image}" class="mx-auto" title="${item.title}">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${item.title}</h5>
                                    <p class="card-text descript">${item.description}</p>
                                    <h4 class="text-end">$${item.price}</h4>
                                </div>
                            </div>
            `).join("")
        } else {
            tag.innerHTML =  `<h1 class="text-center mb-3">Not found</h1>`
        }
    }  
}

let stuff = await fetch(marketURL);
model.stuff = await stuff.json();
console.log(model.stuff);
model.renderList();

let searchInput = document.querySelector('#search');
let sortUp = document.querySelector('#sort-up');
let sortDown = document.querySelector('#sort-down');


searchInput.addEventListener("input", function(){
    model.search = searchInput.value;
    model.renderList();
});

sortUp.addEventListener("click", function(){
    model.sort = true;
    model.renderList();
});
    
sortDown.addEventListener("click", function(){
    model.sort = false;
    model.renderList();
})

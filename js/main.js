   // chaqirib olgan uzgaruvchilarimiz
var elDiv = document.querySelector("#div")
var elForm = document.querySelector("#form")
var elInput = document.querySelector("#inputname")
var elWrapper = document.querySelector("#card_film")
var elTitle = document.querySelector("#title")
 
// teplate o'zgaruvchisi
let elPostTemplate = document.querySelector("#post_item_template").content

// filim kurinishi
function render(felimArry, wrapper) {
	var resultRender = document.createDocumentFragment()

	//kino bor yuqligini bilish uchun if ga tekshiramiz
	if (felimArry) {
		felimArry.forEach( movis  => {
			var moviesCard = elPostTemplate.cloneNode(true)
			
			moviesCard.querySelector("#moves-img").src = movis.Poster;
			moviesCard.querySelector("#moves-title").textContent = movis.Title;
			moviesCard.querySelector("#moves-year").textContent = `Year: ${movis.Year}`;
			moviesCard.querySelector("#moves-youtobe").href = movis.imdbID;
			
			resultRender.appendChild(moviesCard)
		})
		
		wrapper.innerHTML = null
		wrapper.appendChild(resultRender)
	}else{
		wrapper.innerHTML = null
		alert("Ma'lumot kelmadi")
	}
	console.log(felimArry);
	

	  // sear resulag
	elTitle.textContent = `Sear result: ${felimArry.length}`;
} 

    // filim linki
async function fetchData(saerch_name) {
	let response = await fetch(`https://www.omdbapi.com/?apikey=73119f16&s=${saerch_name}`)
	
	let data = await response.json()
	  // fuction ishlatish
	render(data.Search, elWrapper)
}




 // input ishlashi
elForm.addEventListener("submit", (evt) => {
	evt.preventDefault()
	
	var search = elInput.value.trim()
	fetchData(search)
	console.log(search)
})
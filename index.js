
const cheerio = require("cheerio")
const richiesta = require("request")


const getResultLink = (strUrl, idx) =>{

	if(strUrl)
	strUrl = strUrl.replace('\n', '')

	const argument = ["Film", "Attore", "Regista"]
	let linkTitle = ''
	const wikiLink = "https://it.wikipedia.org";

	if(idx % 6 == 1){
		linkTitle = argument[0]
	}
	if(idx % 6 == 4){
		linkTitle = argument[1]
	}
	if(idx % 6 == 5){
		linkTitle = argument[2]
	}

	if(strUrl !== undefined)
	console.log(linkTitle + ' link: ' + wikiLink + strUrl + '\n' )
	else
	console.log(linkTitle + ' link: ' + strUrl + '\n')

}

 richiesta("https://it.wikipedia.org/wiki/Film_di_James_Bond", (errore, risposta, paginaWeb) =>{
	 if(!errore && risposta.statusCode == 200)
	 {

         const $ = cheerio.load(paginaWeb)

		 $("h3 + .wikitable td ").each( (i, e) =>{
			 const numeroFilm = $(e).html();

			if(i % 6 == 0){
			 console.log("\n---------------------------------------------------\n\n")
        	 	 console.log("numeroFilm: " + numeroFilm)
			}

			if(i % 6 == 1){
        	 	 console.log("Titolo Film: " + $(e).text())
			 
			 const filmLink = cheerio.load(e)
			 getResultLink(filmLink("a").attr('href'), i)
			}
			 
			if(i % 6 == 2)
            	 	console.log("Titolo Originale: " + $(e).text()) 

			if(i % 6 == 3)
            	 	console.log("Anno: " + $(e).text())
			 
			if(i % 6 == 4){
            	 	console.log("Attore: " + $(e).text())
			 const linkAttore = cheerio.load(e)
			 getResultLink(linkAttore("a").attr('href'), i)
			}

			if(i % 6 == 5){
            	 	console.log("Regista: " + $(e).text())			 
		 	
			 const linkRegista = cheerio.load(e)
			 getResultLink(linkRegista("a").attr('href'), i)

			}			 
		 });	             
 	 }
	 else{
		 console.log(errore)
	 }
 })

		
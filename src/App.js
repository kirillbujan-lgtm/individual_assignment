import { useState } from 'react'
import { movies } from "./data/data.js";
import './App.css'

var data_rule = movies

function App() {
	const [count, setCount] = useState(0)
	const [movie_name, setMovie] = useState("")
	const [name, setName] = useState("")
	const [movie_year, setMovieYear] = useState(0)
	const [year, setYear] = useState(2000)
	
	switch(count){
		case  0:
			setStandart()
			data_rule=movies

			break
		case  1:
			setStandart()
			data_rule=movies.filter((d) => d.year == movie_year)
			break
		case  2:
			setStandart()
			data_rule=movies.filter((d) => d.name.includes(movie_name))
			break
		case  3:
			setStandart()
			data_rule=movies.filter((d) => d.genres.find( f => f.includes(movie_name)))
			break
	}
	
	function setFull_screen(divId){
		var em = document.getElementById(divId)
		var new_em=em.cloneNode(true);
		new_em.setAttribute('class',"full_screen")
		document.getElementById("body_container").setAttribute('style',"display: none")
		document.getElementById("for_full_muvie").appendChild(new_em)
		document.getElementById("for_full_muvie").setAttribute('style',"display: block")
		document.getElementById("main_container").scrollIntoView(new_em)
	}
	
	function setStandart(){
		var fs = document.getElementsByClassName("full_screen")
		if(fs.length!=0){
			document.getElementById("body_container").setAttribute('style',"display: block")
			document.getElementById("for_full_muvie").removeChild(fs[0])
			document.getElementById("for_full_muvie").setAttribute('style',"display: none")
			setCount(-1)
		}
	}
	
	return(
		<div >
			<div id="main_container">
				<header><h1>Застосунок для перегляду фільмів</h1>
				<h3>Пошук:</h3>
				<div id="search_engine">
					
					<form id="forfind">
						<input type="text" placeholder="Усі за замовчуванням" value={name} onChange={(e) => {e.preventDefault()
																		   setName(e.target.value)}} id="main_input"></input>
						<div>												   
						<button className="button" onClick={(e) => {e.preventDefault()
												setCount(2) 
												setMovie(name)}}>За назвою</button>	
						<button className="button" onClick={(e) => {e.preventDefault()
												setCount(3)
												setMovie(name)}}>За жанром</button>
						</div>								
					</form>
					
					<form id="foryear">
						<input type="number" value={year} max="2026" min="1850"  id="input_year" onChange={(e) => {e.preventDefault()
																			setYear(e.target.value)}}/>
						<button className="button" onClick={(e) => {e.preventDefault()
												setCount(1)
												setMovieYear(year)}}>За роком</button>
					</form>
					
				</div>		
				</header>
				<div id="body_container" >
					{data_rule.map((movie) => (
							<div id={movie.id} className="standart" onClick={()=>setFull_screen(movie.id)}>
							
								<form className="info_muvie">
									<img src={movie.url_poster}/>
									<h2>{movie.name} ({movie.year})</h2>
									
									<p className="genre"><b>Жанр:</b> {movie.genres.map((g)=>(
										(g != movie.genres[0])?  (<a> , "{g}"</a>) : (<a>"{g}"</a>)
									))}</p>
									<p><b>Оцінка:</b> {movie.grade}</p>
									<p className="actors"><b>Актори:</b> {movie.actors.map((g)=>(
										(g != movie.actors[0])? (<a> , "{g}"</a>) : (<a>"{g}"</a>)
									))}</p>
								
									<p className="description"><b>Опис:</b> {movie.description}</p>
								</form>
								<form className="video">
									<p><b>Дивитись: </b></p>
									<iframe src={movie.url_muvie} title="YouTube video player" />
								</form>
							</div>
						))
					}
				</div>
				
				<div id="for_full_muvie" style={{display: "none"}}/>
				
			</div>
			<footer> Буян Кирило КНТ-214
			</footer>
		</div>
		
	)
}

export default App

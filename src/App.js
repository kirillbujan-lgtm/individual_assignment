import { useState } from 'react'
import { movies } from "./data/data.js";
import './App.css'


var data_rule = movies.sort((a, b) => ((a.name > b.name)? 1 : -1))
console.log(data_rule)
function App() {
	const [count, setCount] = useState(0)
	const [movie_name, setMovie] = useState("")
	const [name, setName] = useState("")
	const [movie_year, setMovieYear] = useState(0)
	const [year, setYear] = useState(2000)
	const [filters, setFilter] = useState('name')
	
	switch(count){
		case  0:
			setStandart()
			data_rule=data_rule
			break
		case  1:
			setStandart()
			data_rule=data_rule.filter((d) => d.year == movie_year)
			break
		case  2:
			setStandart()
			data_rule=data_rule.filter((d) => d.name.toLowerCase().includes(movie_name.toLowerCase()))
			break
		case  3:
			setStandart()
			data_rule=data_rule.filter((d) => d.genres.find( f => f.toLowerCase().includes(movie_name.toLowerCase())))
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
		if(filters!="grade")data_rule=movies.sort((a, b) => ((a[filters] > b[filters])? 1 : -1))
		else data_rule=movies.sort((a, b) => ((a[filters] < b[filters])? 1 : -1))
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
					<div className="filter_group">
						<select onChange={(e) => (setFilter(e.target.value))}>
						  <option value="name">За назвою</option>
						  <option value="year">За роком</option>
						  <option value="grade">За рейтингом</option>
						</select>
					</div>
					<div id="body_content">
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
				</div>
				
				<div name="for_full_muvie" id="for_full_muvie" style={{display: "none"}}/>
				
			</div>
			<footer> Буян Кирило КНТ-214
			</footer>
		</div>
		
	)
}

export default App

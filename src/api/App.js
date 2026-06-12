import { useState } from 'react'
import { movies } from "../data/data.js";
import setFull_screen from "../components/setFull";
import setStandart from "../components/setStandart.js";
import '../style/App.css'


var data_rule = movies.sort((a, b) => ((a.name > b.name)? 1 : -1))
function App() {
	const [count, setCount] = useState(0)
	const [movie_name, setMovie] = useState("")
	const [name, setName] = useState("")
	const [movie_year, setMovieYear] = useState(0)
	const [year, setYear] = useState(2000)
	const [filters, setFilter] = useState('name')
	
	switch(count){
		case  0:
			data_rule=setStandart(filters)
			break
		case  1:
			data_rule=setStandart(filters)
			data_rule=data_rule.filter((d) => d.year == movie_year)
			break
		case  2:
			data_rule=setStandart(filters)
			data_rule=data_rule.filter((d) => d.name.toLowerCase().includes(movie_name.toLowerCase()))
			break
		case  3:
			data_rule=setStandart(filters)
			data_rule=data_rule.filter((d) => d.genres.find( f => f.toLowerCase().includes(movie_name.toLowerCase())))
			break
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

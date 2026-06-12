import { movies } from "../data/data.js";
var data_rule
export default function setStandart(filter){
		var fs = document.getElementsByClassName("full_screen")
		if(fs.length!=0){
			document.getElementById("body_container").setAttribute('style',"display: block")
			document.getElementById("for_full_muvie").removeChild(fs[0])
			document.getElementById("for_full_muvie").setAttribute('style',"display: none")
			
		}
		if(filter!="grade")data_rule=movies.sort((a, b) => ((a[filter] > b[filter])? 1 : -1))
		else data_rule=movies.sort((a, b) => ((a[filter] < b[filter])? 1 : -1))
		return data_rule
	}
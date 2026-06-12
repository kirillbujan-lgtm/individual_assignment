
export default function setFull_screen(divId){
		var em = document.getElementById(divId)
		var new_em=em.cloneNode(true);
		new_em.setAttribute('class',"full_screen")
		document.getElementById("body_container").setAttribute('style',"display: none")
		document.getElementById("for_full_muvie").appendChild(new_em)
		document.getElementById("for_full_muvie").setAttribute('style',"display: block")
		document.getElementById("main_container").scrollIntoView(new_em)
	
	}
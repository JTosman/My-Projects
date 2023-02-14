var name_inptut = document.getElementById('std-name');
var last_name_input = document.getElementById('std-last-name');
var bird_date_input = document.getElementById('std-bird-date');
var grade_input = document.getElementById('std-grade');
var sex_input = document.getElementById('std-sex');
var matter_input = document.getElementById('std-matters');
var filter_grade = document.getElementById('filter-grade');
var filter_sex = document.getElementById('filter-sex');
var filter_matter = document.getElementById('filter-matter');
var filter_matter_count = document.getElementById('filter-matter-count');
var filter_promedio = document.getElementById('filter-promedio')
var students = [];
window.onload=Liststd();

name_inptut.addEventListener('keypress', ()=> {

	Abort();
})

function Abort (){
	const abort_button = document.querySelector('#abort')
	abort_button.removeAttribute('hidden');
}

function Setmatters (){
	const count = matter_input.value;
	const matters_zone = document.getElementById('matters-section');
	const error_matters = document.querySelector('#error-matters');

	if (!isNaN(count) || count == ""){
		error_matters.innerHTML=""
		let mattersHTML = '';
		const matters_inputs = (i)=> `
			<br>
			<label for="matter-${i+1}">Materia ${i+1}</label>
			<input type="text" class="matter" name="matter-${i+1}" id="matter-${i+1}">
			<div id="error-matter"></div>
			<label for="matter-note ${i+1}">Nota ${i+1}</label>
			<input type="text" class="note" name="note-${i+1}" id="note-${i+1}" onkeypress="return valideKey(event);"">
			<div id="error-note"></div>
			`;

		for (var i = 0 ; i < count; i++) {
			mattersHTML += matters_inputs(i); 
		};
		matters_zone.innerHTML=mattersHTML;
	}else{
		error_matters.innerHTML="No es una cantidad valida"
		matter_input.value = "";
	}
	
		
};

function Getpromedio(notes) {
  let count = 0;
  for (let i = 0; i < notes.length; i++) {
    count += notes[i].note;
  }
  return (count / notes.length).toFixed(2);
};

function Getage (date){
	let today = new Date();
	let birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
   let month = today.getMonth() - birthDate.getMonth();

   if(month < 0 || month === 0 && today.getDate() < birthDate.getDate()){

   	age--;

   };

   return age;
};

function Getstd_info (){

	const matter_count = matter_input.value
	const matter_value = [];

	for (var i = 0; i < matter_count; i++) {
		const get_matters = document.querySelector(`#matter-${i+1}`);
		const get_notes = document.querySelector(`#note-${i+1}`)
		const note = parseInt(get_notes.value);
		const matter = get_matters.value;
		matter_value.push({ label: `Materia ${i+1}`, name: matter, note: note});
		};

	const matter_info = {
		matters: matter_count,
		matters_info: matter_value
	};

	return {
		name: name_inptut.value,
		last_name: last_name_input.value,
		bird_date: bird_date_input.value,
		age: Getage(bird_date_input.value),
		grade: grade_input.value,
		sex: sex_input.value,
		matter: matter_info,
		promedio: Getpromedio(matter_info.matters_info)
	}
}

function Savestd (){
	const student = Getstd_info();
	students = Returnstds();

	students.push(student);
	localStorage.setItem("Estudiantes", JSON.stringify(students));

	Validateinputs();
	Liststd();
	Clearinputs();
};

function Clearinputs (){
	document.getElementById('std-name').value="";
	document.getElementById('std-last-name').value="";
	document.getElementById('std-bird-date').value="";
	document.getElementById('std-grade').value="";
	document.getElementById('std-sex').value="";
	document.getElementById('std-matters').value="";
	document.getElementById('matters-section').innerHTML="";
	const save_button = document.querySelector('#save');
	const abort_button = document.querySelector('#abort')
	abort_button.setAttribute('hidden', true);
	save_button.setAttribute('value', 'Guardar');
	save_button.setAttribute('onclick', 'Savestd()');
	save_button.removeAttribute('std');
};

function Validateinputs (){
	const stds = Getstd_info();
	console.log(stds)

	const notes_values = stds.matter.matters_info;
	const matter_count = stds.matter.matters;
	const error_note = document.querySelector('#error-note');

	console.log(notes_values);
	console.log(matter_count);
	
	for (let i = 0; i < notes_values.length; i++){
		if(!isNaN(notes_values[i].note) || notes_values[i].note == ""){
			error_note.innerHTML="";
		}else{
			error_note.innerHTML="No es un numero";
			return 0;
		}
	}
}

function valideKey(evt){
    
    // code is the decimal ASCII representation of the pressed key.
    const code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}

function Returnstds (){
	const std = localStorage.getItem("Estudiantes");
	return std ? JSON.parse(std) : [];
};

function Showmatters(id){
	const stds = Returnstds();
	const matter_view = document.getElementById(`std-${id}`);
	let matterHTML = '';
	const std = stds[id];

	for (let i = 0; i < std.matter.matters_info.length; i++){
		matterHTML += `<td>${std.matter.matters_info[i].name}</td>`+' '
	}
		
	matter_view.innerHTML="<td>Materias:</td>"+matterHTML;
	
	const hide = document.querySelector(".view-"+id);
	console.log(hide);
	hide.setAttribute('value', "Ocultar Materias");
	hide.setAttribute('onclick', "Hidematters(id)");
}

function Hidematters(id){
	const matter_view = document.getElementById(`std-${id}`);
	matter_view.innerHTML="";
	const show = document.querySelector(".view-"+id);
	show.setAttribute('value', "Ver Materias");
	show.setAttribute('onclick', "Showmatters(id)");
}

function Liststd (){
	let listHTML = "";
	let filter_gradeHTML = "";
	let filter_matterHTML = "";
	const reg_info = document.querySelector('.reg-info');
	const filter_grade_section = document.querySelector("#filter-grade");
	const filter_matter_section = document.querySelector("#filter-matter")
	const aux = Returnstds();
	let fil;
	let stds;
	let reg_matters = Regmatters();
	console.log(aux)

	if (filter_grade.value != "" || filter_sex.value != "" || filter_matter.value != "" || filter_matter_count.value != "" || filter_promedio.value != ""){

		if (filter_grade.value != "" && filter_sex.value != "" && filter_matter_count.value != ""){

			console.log("1")
			fil = aux.filter(item=> item.grade == filter_grade.value && item.sex == filter_sex.value && item.matter.matters == filter_matter_count.value);
		}

		if ((filter_grade.value != "" && filter_sex.value != "" && filter_matter_count == "") || (filter_sex.value != "" && filter_grade.value != "" && filter_matter_count.value == "")){

			console.log("2")
			fil = aux.filter(item=> item.grade == filter_grade.value && item.sex == filter_sex.value);
		}

		if ((filter_grade.value != "" && filter_matter_count.value != "" && filter_sex == "") || (filter_matter_count.value != "" && filter_grade.value != "" && filter_sex.value == "")){

			console.log("3")
			fil = aux.filter(item=> item.grade == filter_grade.value && item.matter.matters == filter_matter_count.value);
		}

		if ((filter_sex.value != "" && filter_matter_count.value != "" && filter_grade == "") || (filter_matter_count.value != "" && filter_sex != "" && filter_grade.value == "")){

			console.log("4")
			fil = aux.filter(item=> item.sex == filter_sex.value && item.matter.matters == filter_matter_count.value);
		}

		filter_grade.value != "" && filter_sex.value == "" && filter_matter_count.value == "" ? fil = aux.filter(item=> item.grade == filter_grade.value) : console.log("not grade");

		filter_sex.value != "" && filter_grade.value == "" && filter_matter_count.value == "" ? fil = aux.filter(item=> item.sex == filter_sex.value) : console.log("not sex");

		filter_matter_count.value != "" && filter_grade.value == "" && filter_sex.value == "" ? fil = aux.filter(item=> item.matter.matters == filter_matter_count.value) : console.log("not matter");

		if (filter_matter.value != "" && filter_grade.value == "" && filter_sex.value == "" && filter_matter_count.value == ""){

			for (let i = 0; i < aux.length; i++){
				aux2 = aux.filter(item=> item.matter.matters_info[i].name == filter_matter.value);
				console.log(aux2)
				if (aux2.length > 0){
					fil = aux2;
					break;
				};
			};

			
		};

		if (filter_promedio.value == "1/10"){
			console.log("1")
			const min = 1;
			const max = 10;
			filter_promedio.value != "" ? fil = aux.filter(item=> item.promedio >= min && item.promedio <= max) : console.log("not promedio");
		}

		if (filter_promedio.value == "11/15"){
			console.log("2")
			console.log(aux);
			const min = 11;	
			const max = 15;
			filter_promedio.value != "" ? fil = aux.filter(item=> item.promedio >= min && item.promedio <= max) : console.log("not promedio");
		}

		if (filter_promedio.value == "16/20"){
			console.log("3")
			const min = 16;
			const max = 20;
			filter_promedio.value != "" ? fil = aux.filter(item=> item.promedio >= min && item.promedio <= max) : console.log("not promedio");
		}

		console.log(fil)

		stds = fil


	}else{

		stds = Returnstds();

	};

	for (let i = 0; i < stds.length; i++){
		const std = stds[i];
		const matter_notes = std.matter.matters_info;
		const std_promedio = Getpromedio(matter_notes)
		listHTML += `
		<tr>
			<td>${std.name}</td>
			<td>${std.last_name}</td>
			<td style="color:${std.age < 18 ? 'red':'black'};">${std.age}</td>
			<td>${std.grade}</td>
			<td>${std.sex}</td>
			<td>${std.matter.matters}</td>
			<td>${std_promedio}</td>
			<td>
			<input type="button" class="edit" id="${i}" onclick="Editstd(id)" value="Editar"></input>
			<input type="button" class="delete" id="${i}" onclick="Removestd(id)" value="Eliminar"></input>
			<input type="button" class="view-${i}" id="${i}" onclick="Showmatters(id)" value="Ver Materias"></input>
			</td>
			<tr id="std-${i}"></tr>
		</tr>
		`;

		filter_gradeHTML += `
			<option>${std.grade}</option>
		`		
	};

	for (let i = 0; i < reg_matters.length; i++){
		filter_matterHTML += `
			<option>${reg_matters[i]}</option>
		`
	};


	reg_info.innerHTML=listHTML;
	filter_grade_section.innerHTML="<option selected></option>"+filter_gradeHTML;
	filter_matter_section.innerHTML="<option selected></option>"+filter_matterHTML;
};

function Regmatters (){
	const stds = Returnstds()
	let filter_reg_matters = [];
	let procesing_matters;
	for (let i = 0; i < stds.length; i++){
		const std = stds[i]
		for (let i = 0; i < std.matter.matters_info.length; i++){
			let matters = std.matter.matters_info[i].name;
			filter_reg_matters.push(matters)
			procesing_matters = filter_reg_matters.filter((item, index)=>{
				return filter_reg_matters.indexOf(item) === index});
		};
	};
	console.log(procesing_matters);
	return procesing_matters;
}

function Removestd (id){
  const students = Returnstds();
  students.splice(id, 1);
  localStorage.setItem("Estudiantes", JSON.stringify(students));
  Liststd();
  Clearinputs();
};

function Editstd (id){
	const stds = Returnstds(id);
	const std_values = stds[id];
	console.log(std_values)
	const update_button = document.querySelector('#save');
	update_button.setAttribute('value', 'Actualizar');
	update_button.setAttribute('std', id);
	update_button.setAttribute('onclick', 'Updatestd()');
	document.getElementById('std-name').value=std_values.name;
	document.getElementById('std-last-name').value=std_values.last_name;
	document.getElementById('std-bird-date').value=std_values.bird_date;
	document.getElementById('std-grade').value=std_values.grade;
	document.getElementById('std-sex').value=std_values.sex;
	document.getElementById('std-matters').value=std_values.matter.matters;
	Setmatters();
	Abort();

	for (let i = 0; i < std_values.matter.matters; i++ ){
		const matters = document.querySelector(`#matter-${i+1}`).value=std_values.matter.matters_info[i].name;
		const notes = document.querySelector(`#note-${i+1}`).value=std_values.matter.matters_info[i].note;;
	};
};

function Updatestd (){
	const student = Getstd_info();
	students = Returnstds();
	const button = document.querySelector('#save');
	const id = button.getAttribute('std');
	
	students.splice(id,1,student);
	localStorage.setItem("Estudiantes", JSON.stringify(students));
   Liststd();
   Clearinputs();

};








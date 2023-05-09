$(document).ready(function(e){


	$("#btnIniciar").onclick = () => {
		ClearInputs();
		ShowForm();
	};

function StoreInfo (temp){

	const valid = ValidateInputs();

	console.log(valid);

	if (valid){
		const name = $('#fullname').val();
		const birth = $('#birth').val();
		const email = $('#email').val();
		const country = $('#country').val();
		const state = $('#state').val();
		const temperature = temp;


		let modal_title = `
		<div class="col-12 modal-name">
			<h1 class="modal-title fs-5" id="modal-title">${name == "" ? "Sin nombre": name}</h1>
      	</div>
      	<div class="col-12 modal-temp">
      		<h1 class="modal-temp fs-5" id="modal-temp">Temp: ${temp}°C</h1>
      	</div>`;
		let modal_birth = `
		<label for="modal_birth">Fecha de Nacimiento</label>
		<h3 class="modal-birth fs-5" id="modal-birth">${birth == "" ? "Sin Fecha" : birth}</h3>`;
		let modal_country = `
		<label for="modal_country">País de Origen</label>
		<h3 class="modal-country fs-5" id="modal-country">${country == "..." || country == null ? "Sin Pais": country}</h3>`;
		let modal_state = `
		<label for="modal_state">Region</label>
		<h3 class="modal-state fs-5" id="modal-state">${state == "..." || state == null ? "Sin Region": state}</h3>`;
		let modal_email = `
		<label for="modal_email">Correo Electronico</label>
		<h3 class="modal-email fs-5" id="modal-email">${email == "" ? "Sin Email": email}</h3>`;

		let modal_title_html = document.querySelector('.modal-header');
		let modal_birth_html = document.querySelector('.modal-birth-date');
		let modal_country_html = document.querySelector('.modal-country');
		let modal_state_html = document.querySelector('.modal-state');
		let modal_email_html = document.querySelector('.modal-email');

		modal_title_html.innerHTML = modal_title;
		modal_birth_html.innerHTML = modal_birth;
		modal_country_html.innerHTML = modal_country;
		modal_state_html.innerHTML = modal_state;
		modal_email_html.innerHTML = modal_email;
		clearInterval(idInterval);
		HideForm();
		PrintingInfo();
		
	}else{
		return 0;
	}

}

function Getage(date) {
	let today = new Date();
	let birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	let month = today.getMonth() - birthDate.getMonth();

	if (month < 0 || month === 0 && today.getDate() < birthDate.getDate()) {

		age--;

	};

	return age;
};


function ShowForm (){
	$('#exampleModal').modal("hide");
	let form_section = document.querySelector('#form');
	let welcome_section = document.querySelector('#welcome')
	form_section.removeAttribute('hidden');
	welcome_section.setAttribute('hidden', '');
}

function HideForm (){
	let form_section = document.querySelector('#form');
	let welcome_section = document.querySelector('#welcome');
	form_section.setAttribute('hidden', '');
	welcome_section.removeAttribute('hidden'); 
}

function ClearInputs (){
	let modal_name_html = document.querySelector('.modal-header');
	let modal_birth_html = document.querySelector('.modal-birth-date');
	let modal_email_html = document.querySelector('.modal-email');
	const name = $('#fullname').val('');
	const birth = $('#birth').val('');
	const email = $('#email').val('');
	const countries = document.querySelector('#country');
	const states = document.querySelector('#state');
	modal_name_html.innerHTML = "";
	modal_birth_html.innerHTML = "";
	modal_email_html.innerHTML = "";
	countries.innerHTML = "";
	states.innerHTML = "";
}

function ValidateInputs (){
	const name = $('#fullname').val();
	const birth = $('#birth').val();
	const country = $('#country').val();
	const state = $('#state').val();
	const email = $('#email').val();
	const age = Getage(birth);
	const validateEmail = (email) => {
		return email.match(
		  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	 };

	let valid;
	let valid_name;
	let valid_birth;
	let valid_country;
	let valid_state;
	let valid_email;
	let alert_valid = `<p class="text-danger">Campo Obligatorio</p>`
	let birth_invalid = `<p class="text-danger">Edad invalida</p>`
	let email_invalid = `<p class="text-danger">Correo invalido</p>`


	const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();

	if (tiempoRestante <= 0){

		valid = true;

	}else{

		if (name == ""){
			let valid_html = document.querySelector('.validate-name');
			valid_html.innerHTML = alert_valid;
			valid_name = false;
		}else{
			let valid_html = document.querySelector('.validate-name');
			valid_html.innerHTML = "";
			valid_name = true;
		}

		if (birth == ""){
			let valid_html = document.querySelector('.validate-birth');
			valid_html.innerHTML = alert_valid;
			valid_birth = false;
		}else if (age < 18 || age > 63){
			let valid_html = document.querySelector('.validate-birth');
			valid_html.innerHTML = birth_invalid;
			valid_birth = false;
		}else{
			let valid_html = document.querySelector('.validate-birth');
			valid_html.innerHTML = "";
			valid_birth = true;
		}

		if (country == "..." || country == null){
			let valid_html = document.querySelector('.validate-country');
			valid_html.innerHTML = alert_valid;
			valid_country = false;
		}else{
			let valid_html = document.querySelector('.validate-country');
			valid_html.innerHTML = "";
			valid_country = true;
		}

		if (state == "..." || state == null){
			let valid_html = document.querySelector('.validate-state');
			valid_html.innerHTML = alert_valid;
			valid_state = false;
		}else{
			let valid_html = document.querySelector('.validate-state');
			valid_html.innerHTML = "";
			valid_state = true;
		}

		if (email == ""){
			let valid_html = document.querySelector('.validate-email');
			valid_html.innerHTML = alert_valid;
			valid_email = false;
		}else if(!validateEmail(email)){
			let valid_html = document.querySelector('.validate-email');
			valid_html.innerHTML = email_invalid;
		}else{
			let valid_html = document.querySelector('.validate-email');
			valid_html.innerHTML = "";
			valid_email = true;
		}

		if (valid_name && valid_birth && valid_country && valid_state && valid_email){
			valid = true;
		}else{
			valid = false;
		}
	}

	return valid;
}

function PrintingInfo (){

	$('#exampleModal').modal("show");
}

const country = document.querySelector('#country')

country.addEventListener('change', ()=>{

});

let btn_close = document.querySelector('#btn-close-modal');

btn_close.addEventListener('click', ()=>{
	ClearInputs();
	HideForm();
	mostrarElemento($btnIniciar);
});

let btn_submit = document.querySelector('#btn-submit');



});

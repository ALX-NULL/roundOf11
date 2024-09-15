const input = document.getElementById('input');
const submit_btn = document.getElementById('submit_btn');
const upload_img = document.getElementById('upload_img');

input.addEventListener('input', function() {
	if (input.value.trim() === "") {
		uploadImg.src = 'imges/upload_dim.svg';
		submit_btn.classList.add('disabled');
		submit_btn.disabled = true; 
	} else {
		upload_img.src = 'imges/upload.svg';
		submit_btn.classList.remove('disabled');
		submit_btn.disabled = false; 
	}
});

document.getElementById('form').addEventListener('submit', function(e) {
	if (input.value.trim() === "") {
		e.preventDefault();
	}
});

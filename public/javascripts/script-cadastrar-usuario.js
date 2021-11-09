const form = document.querySelector('.form-cadastro-usuario')
const errorContainer = document.querySelector('.errors-container');

const {nome: nomeInput, usuario, email, data_nascimento, senha,senha_repetir} = form.elements;

const formElements = [nomeInput, usuario, email, data_nascimento, senha,senha_repetir];


function checkIfEmpty(input, errors) {
    if (!input.value.trim().length) {
      errors.push(`Preenha o campo ${input.name}, noob`);
    }
  };
  
  function validateEmailInput() {
    const isValidEmail = email.value.includes('@') && email.value.includes('.');
    const isEmailWithinLimit = email.value.trim().length >= 10 && email.value.trim().length <= 100
  
    const span = email.nextElementSibling;
    span.innerText = "";
  
    if(!isValidEmail){
      email.style.borderColor = "red";
      span.innerText = 'O email deve ser valido!';
      email.insertAdjacentElement('afterend', span);
      return false;
    }
  
    if(!isEmailWithinLimit){
      email.style.borderColor = "red";
      span.innerText = 'O email deve ter entre 10 e 100 caracteres!';
      email.insertAdjacentElement('afterend', span);
      return false;
    }
  
    email.style.borderColor = "green";
  
    return true;
  }
  
  email.onblur = validateEmailInput;
  
  function validateNameInput() {
    const isNameWithinLimit = nomeInput.value.trim().length >= 2 && nomeInput.value.trim().length <= 80;
  
    const span = nomeInput.nextElementSibling;
    span.innerText = "";
  
    if(!isNameWithinLimit){
      nomeInput.style.borderColor = "red";
      span.innerText = 'O nomeInput deve ter entre 2 e 80 caracteres!';
      nomeInput.insertAdjacentElement('afterend', span);
      return false;
    }
  
    nomeInput.style.borderColor = "green";
  
    return true;
  }
  
  nomeInput.onblur = validateNameInput;
  
  //--------

  function validateUsuarioInput() {
    const isUsuarioWithinLimit = nomeInput.value.trim().length >= 2 && nomeInput.value.trim().length <= 80;
  
    const span = usuario.nextElementSibling;
    span.innerText = "";
  
    if(!isUsuarioWithinLimit){
      usuario.style.borderColor = "red";
      span.innerText = 'O usuario deve ter entre 2 e 80 caracteres!';
      usuario.insertAdjacentElement('afterend', span);
      return false;
    }
  
    usuario.style.borderColor = "green";
  
    return true;
  }
  
  usuario.onblur = validateUsuarioInput;

  function validateDateOfBirth() {
    const yearOfBirth = Number(moment(data_nascimento.value).format('YYYY'));
    const currentYear = Number(moment().format('YYYY'));
    const age = currentYear - yearOfBirth;
    const isAgeWithinLimit = age >= 16 && age <= 120;
  
    const span = data_nascimento.nextElementSibling;
    span.innerText = "";
  
    if(!isAgeWithinLimit) {
      data_nascimento.style.borderColor = "red";
      span.innerText = 'A idade deve estar entre 16 e 120 anos!';
      data_nascimento.insertAdjacentElement('afterend', span);
      return false;
    }
  
    data_nascimento.style.borderColor = "green";
    return true;
  }
  
  function validateDate(element){
    const v = element.value
    if (v.match(/^\d{2}$/) !== null) {
      element.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
      element.value = v + '/';
    }    
  }
  
  data_nascimento.onblur = validateDateOfBirth;
  data_nascimento.oninput = () => validateDate(data_nascimento);


  function validateSenhaInput() {
    const isSenhaWithinLimit = senha.value.trim().length >= 2 && senha.value.trim().length <= 80;
        
    const span = senha.nextElementSibling;
    span.innerText = "";
  
    if(!isSenhaWithinLimit){
      // senha.style.borderColor = "red";
      span.innerText = 'O senha deve ter entre 2 e 80 caracteres!';
      senha.insertAdjacentElement('afterend', span);
      return false;
    }

    // verifica se tem ao menos uma letra maiúscula
    const teste = senha.value;
    
    if(teste.match(/[A-Z]{1,}/)){
      senha.style.borderColor = "green";
      span.innerText = 'A senha contém letra maíuscula';
      senha.insertAdjacentElement('afterend', span);
   }else{
    senha.style.borderColor = "red";
    span.innerText = 'A senha NÂO contém letra maíuscula';
    senha.insertAdjacentElement('afterend', span);
   }
  
    return true;
  }
  
  senha.onblur = validateSenhaInput;


  function validateSenhaRepetirInput() {
            
    const span = senha_repetir.nextElementSibling;
    span.innerText = "";
  
    if( senha.value == senha_repetir.value ){
      console.log('entrou no true senha:' +senha.value + ' senha rep: ' + senha_repetir.value )

      senha_repetir.style.borderColor = "green";
      span.innerText = 'Senhas Iguais parabéns';
      senha_repetir.insertAdjacentElement('afterend', span);
      return true;
    }else{
      console.log('senha:' +senha.value + ' senha rep: ' + senha_repetir.value )
      senha_repetir.style.borderColor = "red";
      span.innerText = 'Senhas diferentes';
      senha_repetir.insertAdjacentElement('afterend', span);
      return false;
   }

  }
  
  senha_repetir.onblur = validateSenhaRepetirInput;
  
  
  
  form.addEventListener('submit', function (event) {
    if(!validateEmailInput() || !validateNameInput() || !validateUsuarioInput() || !validateDateOfBirth() || !validateSenhaInput() || !validateSenhaRepetirInput()) {
      return event.preventDefault();
    }
  
    // event.preventDefault();
  

  });


  var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };
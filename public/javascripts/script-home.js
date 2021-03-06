async function carregaPaginaInicial(){


  try {
    await axios.get('http://localhost:3000/home/contarComentarios').then((response) => {

    const span = document.getElementById('qtd_msg');
  
    span.innerText = response.data.qtd_msg;
    });
  
  } catch (error) {
    console.log(error)
  }

  try {
    await axios.get('http://localhost:3000/home/contarThreads').then((response) => {

    const span = document.getElementById('threads_rolando');
  
    span.innerText = response.data.qtd_msg;
    });
  
  } catch (error) {
    console.log(error)
  }

  try {
    await axios.get('http://localhost:3000/home/contarUsuariosFelizes').then((response) => {

    const span = document.getElementById('usuarios_felizes');
  
    span.innerText = response.data.qtd_msg;
    });
  
  } catch (error) {
    console.log(error)
  }
  
}


window.onload = carregaPaginaInicial;

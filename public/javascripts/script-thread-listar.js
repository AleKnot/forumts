async function buscarlikedathread(idthread){


    try {
      console.log('id THREAD JS button: ' + idthread)
      await axios.get('http://localhost:3000/buscarlikedathread/:'+idthread,{
        params: {
            idthreadparam: 'bar'
          }
      }).then((response) => {
        
      const span = document.getElementById('qtd_like');
    
      span.innerText = response.data.qtd_msg;
      });
    
    } catch (error) {
      console.log(error)
    }
  
    
  }
  

  window.onload = carregaPaginaInicial;
  
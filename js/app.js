addEventListener('DOMContentLoaded', function() {
  const correo = {
    email: '', 
    asunto: '', 
    mensaje: ''
  }

  const inputEmail = document.querySelector('#email')
  const inputAsunto = document.querySelector('#asunto')
  const inputMensaje = document.querySelector('#mensaje')
  const btnEnviar = document.querySelector('#formulario button[type="submit"]')
  const btnReset = document.querySelector('#formulario button[type="reset"]')
  const formulario = document.querySelector('#formulario')
  const spinner = document.querySelector('#spinner')

  inputEmail.addEventListener('blur', validar)
  inputAsunto.addEventListener('blur', validar)
  inputMensaje.addEventListener('blur', validar)

  formulario.addEventListener('submit', enviarCorreo)

  btnReset.addEventListener('click', function(e) {
    e.preventDefault()
    formatearFormulario()
  })

  function enviarCorreo(e) {
    e.preventDefault()
    
    spinner.classList.remove('hidden')
    setTimeout(() => {
      spinner.classList.add('hidden')
      formatearFormulario()

      const exito = document.createElement('P')
      exito.classList.add('bg-green-500', 'text-center', 'py-1', 'text-white', 'rounded-md', 'mt-2', 'text-sm')
      exito.textContent = 'Correo enviado correctamente'
      formulario.appendChild(exito)

      setTimeout(() => {
        exito.remove()
      }, 1500)
    }, 1500)
  }

  function validar(e) {
    if(e.target.value.trim() === '') {
      mostrarAlerta(`EL ${e.target.id} es obligatorio`, e.target.parentElement)
      correo[e.target.id] = ''
      validarCorreo()
      return
    } 

    if(e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta('El email no es válido', e.target.parentElement)
      correo[e.target.id] = ''
      validarCorreo()
      return
    }

    limpiarAlerta(e.target.parentElement)

    correo[e.target.id] = e.target.value.trim().toLowerCase()
    validarCorreo()
  }

  function mostrarAlerta(mensaje, referencia) {
    const alerta = referencia.querySelector('.error')
    if(alerta) {
      alerta.remove()
    }

    const error = document.createElement('P')
    error.textContent = mensaje
    error.classList.add('bg-red-400', 'text-white', 'p-1', 'text-center', 'rounded-md', 'mt-2', 'error', 'text-sm')
    referencia.appendChild(error)
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('.error')
    if(alerta) {
      alerta.remove()
    }
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email)
    return resultado
  }

  function validarCorreo() {
    if(Object.values(correo).includes('')) {
      btnEnviar.classList.add('opacity-50')
      btnEnviar.disabled = true
      btnEnviar.classList.remove('cursor-pointer')
      return 
    } 

    btnEnviar.classList.remove('opacity-50')
    btnEnviar.disabled = false
    btnEnviar.classList.add('cursor-pointer')
  }

  function formatearFormulario() {
    formulario.reset()
    correo.email = ''
    correo.asunto = ''
    correo.mensaje = ''
    validarCorreo()
  }
})
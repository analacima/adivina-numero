/***** CONFIGURACIÓN DEL JUEGO ******/

//valores iniciales
const INITIAL_SCORE = 20
const MAX_NUMBER = 20
const LANGUAGE = 'en' // 'en' or 'es'

//mensajes

const MSG_TOO_LOW_EN = 'Too low!'
const MSG_TOO_HIGH_EN = 'Too high!'
const MSG_LOST_EN = 'You lost!'
const MSG_CORRECT_EN = 'Correct number!'
const MSG_START_EN = 'Start guessing...'
const MSG_INVALID_EN = 'Number must be between 1 and '
const MSG_GUESS_EN = '?'
const MSG_BETWEEN_EN = '(Between 1 and '
const MSG_SCORE_EN = '💯 Score: '
const MSG_HIGSCORE_EN = '🥇 Highscore: '
const BTN_AGAIN_EN = 'Again!'
const BTN_CHECK_EN = 'Check!'

const MSG_TOO_LOW_ES = '¡Demasiado bajo!'
const MSG_TOO_HIGH_ES = '¡Demasiado alto!'
const MSG_LOST_ES = '¡Has perdido!'
const MSG_CORRECT_ES = '¡Número correcto!'
const MSG_START_ES = '¡Empieza a adivinar!'
const MSG_INVALID_ES = 'El número debe estar entre 1 y '
const MSG_GUESS_ES = '?'
const MSG_BETWEEN_ES = '(Entre 1 y '
const MSG_SCORE_ES = '💯 Puntuación: '
const MSG_HIGSCORE_ES = '🥇 Mejor puntuación: '
const BTN_AGAIN_ES = '¡Otra vez!'
const BTN_CHECK_ES = '¡Comprobar!'

//colores
const COLOR_CORRECT = '#60b347'
const COLOR_DEFAULT = '#222'

//variables
let score
let highscore
let number
let message

let msg_too_low
let msg_too_high
let msg_lost
let msg_correct
let msg_start
let msg_invalid
let msg_guess
let msg_between
let msg_score
let msg_highscore
let btn_again
let btn_check


//asignamos los valores correspondientes al lenguaje seleccionado

if (LANGUAGE === 'en') {
  msg_too_low = MSG_TOO_LOW_EN
  msg_too_high = MSG_TOO_HIGH_EN
  msg_lost = MSG_LOST_EN
  msg_correct = MSG_CORRECT_EN
  msg_start = MSG_START_EN
  msg_invalid = MSG_INVALID_EN
  msg_guess = MSG_GUESS_EN
  msg_between = MSG_BETWEEN_EN
  msg_score = MSG_SCORE_EN
  msg_highscore = MSG_HIGSCORE_EN
  btn_again = BTN_AGAIN_EN
  btn_check = BTN_CHECK_EN
}
  
if (LANGUAGE === 'es') {
  msg_too_low = MSG_TOO_LOW_ES
  msg_too_high = MSG_TOO_HIGH_ES
  msg_lost = MSG_LOST_ES
  msg_correct = MSG_CORRECT_ES
  msg_invalid = MSG_INVALID_ES
  msg_guess = MSG_GUESS_ES
  msg_between = MSG_BETWEEN_ES
  msg_score = MSG_SCORE_ES
  msg_highscore = MSG_HIGSCORE_ES
  btn_again = BTN_AGAIN_ES
  btn_check = BTN_CHECK_ES
  msg_start = MSG_START_ES
}


/* seleccionar todos los elementos del DOM que necesitamos */
const messageField = document.querySelector('.message')
const scoreField = document.querySelector('.score')
const highscoreField = document.querySelector('.highscore')
const numberField = document.querySelector('.number') // ?
const guessField = document.querySelector('.guess')
const checkBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')
const betweenField = document.querySelector('.between')
const scoreLabel = document.querySelector('.label-score')
const highscoreLabel = document.querySelector('.label-highscore')

/***** FIN DE LA CONFIGURACIÓN ******/

/***** LÓGICA DEL JUEGO ******/
//inicializamos los datos y el DOM
initData()
resetDOM()

//añadimos los eventos a los botones
checkBtn.addEventListener('click', checkNumber)
againBtn.addEventListener('click', resetGame)
//cuando se pulsa la tecla enter, se comprueba el número
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkNumber()
})

//inicializa los datos del juego calculando un número aleatorio y poniendo la puntuación a su valor inicial
function initData() {
  score = INITIAL_SCORE
  number = Math.trunc(Math.random() * MAX_NUMBER) + 1
  highscore = localStorage.getItem('highscore') || 0 //si no hay highscore guardado en localstorage, se pone a 0
}

// resetea todos los elementos del DOM al estado inicial
function resetDOM() {
  scoreField.textContent = score
  guessField.value = ''
  numberField.textContent = msg_guess
  //actualizamos el highscore por si estaba guardado en localstorage
  highscoreField.textContent = highscore 
  
  againBtn.textContent = btn_again
  betweenField.textContent = `${msg_between} ${MAX_NUMBER})`
  messageField.textContent = msg_start
  //scoreLabel.textContent = msg_score
  //highscoreLabel.textContent = msg_highscore
  checkBtn.textContent = btn_check

  checkBtn.disabled = false
  document.body.style.backgroundColor = COLOR_DEFAULT
}

function checkNumber() {
  // obtenemos el número pulsado
  const guess = Number(guessField.value)
  // comprobamos si está en el rango correcto
  if (guess < 1 || guess > MAX_NUMBER) {
    displayMessage(`${msg_invalid}${MAX_NUMBER}`)
  } else {
    // si no es correcto...
    if (guess !== number) {
      wrongNumber(guess)
      scoreDown()
    }
    // si acierta el número
    else {
      winGame()
      if (score > highscore) {
        changeHighscore()
      }
    }
  }
}

//función para reiniciar el juego
function resetGame() {
  initData()
  resetDOM()
}

//función para actualizar el highscore
function changeHighscore() {
  highscore = score
  highscoreField.textContent = highscore
  localStorage.setItem('highscore', highscore)
}

//función para mostrar el mensaje de acierto
function winGame() {
  displayMessage(msg_correct)
  numberField.textContent = number
  document.body.style.backgroundColor = COLOR_CORRECT
}

//función para bajar la puntuación
function scoreDown() {
  score--
  scoreField.textContent = score
}

function wrongNumber(guess) {
  if (score > 1) {
    //mostramos si el número es demasiado alto o bajo
    message = guess < number ? msg_too_low : msg_too_high
  } else {
    // si se queda sin intentos
    message = msg_lost
    checkBtn.disabled = true
  }
  displayMessage(message)
}

function displayMessage(message) {
  messageField.textContent = message
}

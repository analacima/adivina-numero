/***** CONFIGURACIÓN DEL JUEGO ******/

//valores iniciales
const INITIAL_SCORE = 20
const MAX_NUMBER = 20
//const LANGUAGE = 'es' // 'en' or 'es'

//mensajes
/*
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
*/
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

let MSG_TOO_LOW
let MSG_TOO_HIGH
let MSG_LOST
let MSG_CORRECT
let MSG_START
let MSG_INVALID
let MSG_GUESS
let MSG_BETWEEN
let MSG_SCORE
let MSG_HIGSCORE
let BTN_AGAIN
let BTN_CHECK

//asignamos los valores correspondientes al lenguaje seleccionado
/*
if (LANGUAGE === 'en') {
  MSG_TOO_LOW = MSG_TOO_LOW_EN
  MSG_TOO_HIGH = MSG_TOO_HIGH_EN
  MSG_LOST = MSG_LOST_EN
  MSG_CORRECT = MSG_CORRECT_EN
  MSG_START = MSG_START_EN
  MSG_INVALID = MSG_INVALID_EN
  MSG_GUESS = MSG_GUESS_EN
  MSG_BETWEEN = MSG_BETWEEN_EN
  MSG_SCORE = MSG_SCORE_EN
  MSG_HIGSCORE = MSG_HIGSCORE_EN
  BTN_AGAIN = BTN_AGAIN_EN
  BTN_CHECK = BTN_CHECK_EN
}
  */
//if (LANGUAGE === 'es') {
MSG_TOO_LOW = MSG_TOO_LOW_ES
MSG_TOO_HIGH = MSG_TOO_HIGH_ES
MSG_LOST = MSG_LOST_ES
MSG_CORRECT = MSG_CORRECT_ES
MSG_INVALID = MSG_INVALID_ES
MSG_GUESS = MSG_GUESS_ES
MSG_BETWEEN = MSG_BETWEEN_ES
/*
  MSG_START = MSG_START_ES
  MSG_SCORE = MSG_SCORE_ES
  MSG_HIGSCORE = MSG_HIGSCORE_ES
  BTN_AGAIN = BTN_AGAIN_ES
  BTN_CHECK = BTN_CHECK_ES
  */
//}

//colores
const COLOR_CORRECT = '#60b347'
const COLOR_DEFAULT = '#222'

//variables
let score
let highscore
let number
let message

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
  numberField.textContent = MSG_GUESS
  highscoreField.textContent = highscore //actualizamos el highscore por si estaba guardado en localstorage
  /*
  messageField.textContent = MSG_START
  
  betweenField.textContent = `${MSG_BETWEEN} ${MAX_NUMBER})`
  scoreLabel.textContent = MSG_SCORE
  highscoreLabel.textContent = MSG_HIGSCORE
  checkBtn.textContent = BTN_CHECK
  againBtn.textContent = BTN_AGAIN
*/
  checkBtn.disabled = false
  document.body.style.backgroundColor = COLOR_DEFAULT
}

function checkNumber() {
  // obtenemos el número pulsado
  // al convertirlo a número, los caracteres no numéricos pasan a tener el valor 0
  const guess = Number(guessField.value)
  // comprobamos si está en el rango correcto
  if (guess < 1 || guess > MAX_NUMBER) {
    //mostrar mensaje de error indicando que el número debe estar entre 1 y el máximo (MAX_NUMBER)
    displayMessage(`${MSG_INVALID}${MAX_NUMBER}`)
  } else {
    // si no es correcto...
    if (guess !== number) {
      // mostramos si es demasiado alto o bajo, o si ha perdido
      wrongNumber(guess)
      // bajamos la puntuación
      scoreDown()
    }
    // si acierta el número
    else {
      // cambiamos la pantalla y actualizamos los mensajes
      winGame()
      //comprobamos el highscore y lo actualizamos si es necesario
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
  displayMessage(MSG_CORRECT)
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
    //messageField.textContent = guess < number ? MSG_TOO_LOW : MSG_TOO_HIGH
    message = guess < number ? MSG_TOO_LOW : MSG_TOO_HIGH
  } else {
    // si se queda sin intentos
    message = MSG_LOST
    checkBtn.disabled = true
  }
  displayMessage(message)
}

function displayMessage(message) {
  messageField.textContent = message
}

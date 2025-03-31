// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Aplicar animaciones a los elementos
        const elements = document.querySelectorAll('.card, .resource-card, .process-step');
        elements.forEach((el, index) => {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (index * 100).toString());
        });
    } else {
        console.warn('AOS library not loaded');
    }
    
    // Asegurarse de que la primera pestaña esté visible al cargar la página
    const introduccion = document.getElementById("introduccion");
    if (introduccion) {
        introduccion.classList.add("active");
        introduccion.style.display = "block"; // Asegurarse de que sea visible
    }
    
    // Asegurarse de que el primer botón tenga la clase active
    const firstTab = document.querySelector(".tab-button");
    if (firstTab) {
        firstTab.classList.add("active");
    }
});

// Función para abrir pestañas
function openTab(evt, tabName) {
    console.log("Abriendo pestaña:", tabName);
    
    // Ocultar todo el contenido de las pestañas
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active");
    }
    
    // Quitar la clase "active" de todos los botones de pestañas
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    // Mostrar la pestaña actual y añadir la clase "active" al botón
    var currentTab = document.getElementById(tabName);
    if (currentTab) {
        currentTab.style.display = "block";
        currentTab.classList.add("active");
    }
    
    evt.currentTarget.classList.add("active");
    
    // Reinicializar AOS para los elementos visibles
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

// Asegurarse de que la primera pestaña esté visible al cargar la página
window.onload = function() {
    // Mostrar la pestaña de introducción por defecto
    document.getElementById("introduccion").classList.add("active");
    
    // Asegurarse de que el primer botón tenga la clase active
    var firstTab = document.getElementsByClassName("tab-button")[0];
    if (firstTab) {
        firstTab.classList.add("active");
    }
};

// Función para añadir reacciones con emojis
function addReaction(type) {
    var countElement = document.getElementById(type + "-count");
    var count = parseInt(countElement.innerText);
    countElement.innerText = count + 1;
    
    // Añadir animación al botón
    const button = countElement.parentElement;
    button.classList.add('animate__animated', 'animate__rubberBand');
    
    // Quitar la clase de animación después de que termine
    setTimeout(() => {
        button.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
    
    // Mostrar confeti si es la primera reacción
    if (count === 0) {
        showConfetti();
    }
}

// Función para mostrar confeti
function showConfetti() {
    // Efecto de confeti
    for (var i = 0; i < 150; i++) {
        createConfettiPiece();
    }
}

function createConfettiPiece() {
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    
    var confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Tamaño aleatorio
    const size = Math.random() * 10 + 5;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    // Forma aleatoria
    const shapes = ['circle', 'square', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = `${size}px solid transparent`;
        confetti.style.borderRight = `${size}px solid transparent`;
        confetti.style.borderBottom = `${size * 1.5}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
    }
    
    document.body.appendChild(confetti);
    
    // Eliminar el confeti después de la animación
    setTimeout(function() {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 5000);
}

// Función para verificar las respuestas del quiz
function checkQuiz() {
    // Respuestas correctas
    const respuestasCorrectas = {
        q1: "c",
        q2: "d",
        q3: "b",
        q4: "b",
        q5: "false"
    };
    
    let puntuacion = 0;
    let total = Object.keys(respuestasCorrectas).length;
    
    // Verificar preguntas de opción múltiple
    for (let pregunta in respuestasCorrectas) {
        const opcionSeleccionada = document.querySelector(`input[name="${pregunta}"]:checked`);
        
        // Marcar visualmente las respuestas correctas e incorrectas
        const opciones = document.querySelectorAll(`input[name="${pregunta}"]`);
        opciones.forEach(opcion => {
            const label = opcion.parentElement;
            
            // Resetear estilos
            label.classList.remove('correct-answer', 'wrong-answer');
            
            if (opcion.checked) {
                if (opcion.value === respuestasCorrectas[pregunta]) {
                    label.classList.add('correct-answer');
                    puntuacion++;
                } else {
                    label.classList.add('wrong-answer');
                }
            } else if (opcion.value === respuestasCorrectas[pregunta]) {
                // Destacar la respuesta correcta si no fue seleccionada
                label.classList.add('correct-answer');
                label.style.opacity = '0.7';
            }
        });
    }
    
    const porcentaje = Math.round((puntuacion / total) * 100);
    const feedback = document.getElementById('quiz-feedback');
    
    if (porcentaje >= 80) {
        feedback.className = 'feedback success';
        feedback.innerHTML = `
            <h4><i class="fas fa-trophy"></i> ¡Excelente trabajo!</h4>
            <p>Has obtenido ${puntuacion} de ${total} respuestas correctas (${porcentaje}%).</p>
            <p>Tienes un excelente entendimiento de los conceptos de ondas y tsunamis.</p>
        `;
        showConfetti();
    } else if (porcentaje >= 60) {
        feedback.className = 'feedback success';
        feedback.innerHTML = `
            <h4><i class="fas fa-star"></i> ¡Buen trabajo!</h4>
            <p>Has obtenido ${puntuacion} de ${total} respuestas correctas (${porcentaje}%).</p>
            <p>Tienes un buen entendimiento de los conceptos, pero aún hay espacio para mejorar.</p>
        `;
    } else {
        feedback.className = 'feedback error';
        feedback.innerHTML = `
            <h4><i class="fas fa-book"></i> Sigue aprendiendo</h4>
            <p>Has obtenido ${puntuacion} de ${total} respuestas correctas (${porcentaje}%).</p>
            <p>Te recomendamos revisar nuevamente los conceptos de ondas y tsunamis.</p>
        `;
    }
    
    feedback.style.display = 'block';
    
    // Desplazarse al feedback
    feedback.scrollIntoView({ behavior: 'smooth' });
}

// Inicializar el quiz
function initQuiz() {
    // Añadir estilos para respuestas correctas e incorrectas
    const style = document.createElement('style');
    style.textContent = `
        .correct-answer {
            background-color: rgba(6, 214, 160, 0.2) !important;
            border-left: 4px solid var(--success-color) !important;
        }
        
        .wrong-answer {
            background-color: rgba(239, 71, 111, 0.2) !important;
            border-left: 4px solid var(--danger-color) !important;
        }
    `;
    document.head.appendChild(style);
}
// Script adicional para asegurar que las pestañas funcionen correctamente
window.addEventListener('load', function() {
    console.log("Verificando pestañas...");
    
    // Forzar la visualización de todas las pestañas primero para depuración
    const allTabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < allTabs.length; i++) {
        console.log("Tab encontrada:", allTabs[i].id);
    }
    
    // Asegurarse de que la primera pestaña esté visible
    const introduccion = document.getElementById("introduccion");
    if (introduccion) {
        introduccion.style.display = "block !important";
        introduccion.setAttribute("style", "display: block !important");
        introduccion.classList.add("active");
        console.log("Pestaña de introducción activada");
    }
    
    // Redefinir la función openTab directamente
    window.openTab = function(evt, tabName) {
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
            currentTab.setAttribute("style", "display: block !important");
            currentTab.classList.add("active");
            console.log("Pestaña activada:", tabName);
        } else {
            console.error("No se encontró la pestaña:", tabName);
        }
        
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");
        }
    };
    
    // Aplicar onclick a todos los botones de pestañas
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        const button = tabButtons[i];
        try {
            const onclickAttr = button.getAttribute("onclick");
            if (onclickAttr) {
                const tabId = onclickAttr.match(/openTab\(event,\s*'([^']+)'\)/)[1];
                
                // Asegurarse de que el evento onclick funcione correctamente
                button.onclick = function(event) {
                    openTab(event, tabId);
                    return false; // Prevenir comportamiento predeterminado
                };
                console.log("Evento onclick configurado para:", tabId);
            }
        } catch (error) {
            console.error("Error al configurar el botón:", error);
        }
    }
    
    // Activar la primera pestaña después de un breve retraso
    setTimeout(function() {
        const firstButton = document.querySelector(".tab-button");
        if (firstButton) {
            firstButton.click();
        } else {
            // Forzar la visualización de la primera pestaña si no hay botones
            if (introduccion) {
                introduccion.style.display = "block";
                introduccion.setAttribute("style", "display: block !important");
            }
        }
    }, 500);
});
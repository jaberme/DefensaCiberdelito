/* Despliegue del menu en pantallas pequenas.
   La hoja de estilos solo oculta el menu cuando este script ha marcado el
   documento con la clase «con-js», de modo que sin JavaScript la navegacion
   sigue siendo accesible. */
(function () {
  "use strict";

  document.documentElement.classList.add("con-js");

  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.querySelector(".navegacion__boton");
    var navegacion = document.querySelector(".navegacion");
    if (!boton || !navegacion) return;

    function cambiar(abierta) {
      navegacion.setAttribute("data-abierta", abierta ? "si" : "no");
      boton.setAttribute("aria-expanded", abierta ? "true" : "false");
    }

    boton.addEventListener("click", function () {
      cambiar(boton.getAttribute("aria-expanded") !== "true");
    });

    // Escape cierra el menu y devuelve el foco al boton.
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
        cambiar(false);
        boton.focus();
      }
    });

    // Al pasar a pantalla ancha el menu vuelve a su estado normal.
    var ancha = window.matchMedia("(min-width: 52.0625rem)");
    var alCambiar = function (consulta) {
      if (consulta.matches) cambiar(false);
    };
    if (ancha.addEventListener) ancha.addEventListener("change", alCambiar);
  });
})();

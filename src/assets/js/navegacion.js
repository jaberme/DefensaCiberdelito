/* Despliegue del menu en pantallas pequenas y de sus submenus.
   La hoja de estilos solo oculta controles cuando este script ha marcado el
   documento con la clase «con-js», de modo que sin JavaScript la navegacion
   completa sigue siendo accesible. */
(function () {
  "use strict";

  document.documentElement.classList.add("con-js");

  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.querySelector(".navegacion__boton");
    var navegacion = document.querySelector(".navegacion");
    if (!boton || !navegacion) return;

    var desplegables = Array.prototype.slice.call(
      navegacion.querySelectorAll(".navegacion__desplegable"),
    );

    function cambiarSubmenu(botonSubmenu, abierto) {
      var item = botonSubmenu.closest(".navegacion__item--con-submenu");
      if (!item) return;
      item.setAttribute("data-submenu-abierto", abierto ? "si" : "no");
      botonSubmenu.setAttribute("aria-expanded", abierto ? "true" : "false");
      botonSubmenu.setAttribute(
        "aria-label",
        (abierto ? "Ocultar" : "Mostrar") +
          " opciones de " +
          item.querySelector(".navegacion__enlace").textContent.trim(),
      );
    }

    function cerrarSubmenus(excepto) {
      desplegables.forEach(function (botonSubmenu) {
        if (botonSubmenu !== excepto) cambiarSubmenu(botonSubmenu, false);
      });
    }

    function cambiar(abierta) {
      navegacion.setAttribute("data-abierta", abierta ? "si" : "no");
      boton.setAttribute("aria-expanded", abierta ? "true" : "false");
      if (!abierta) cerrarSubmenus();
    }

    boton.addEventListener("click", function () {
      cambiar(boton.getAttribute("aria-expanded") !== "true");
    });

    desplegables.forEach(function (botonSubmenu) {
      botonSubmenu.addEventListener("click", function () {
        var abrir = botonSubmenu.getAttribute("aria-expanded") !== "true";
        cerrarSubmenus(botonSubmenu);
        cambiarSubmenu(botonSubmenu, abrir);
      });
    });

    document.addEventListener("click", function (evento) {
      if (!navegacion.contains(evento.target)) cerrarSubmenus();
    });

    // Escape cierra el menu y devuelve el foco al boton.
    document.addEventListener("keydown", function (evento) {
      if (evento.key !== "Escape") return;

      var submenuAbierto = desplegables.find(function (botonSubmenu) {
        return botonSubmenu.getAttribute("aria-expanded") === "true";
      });

      if (submenuAbierto) {
        cambiarSubmenu(submenuAbierto, false);
        submenuAbierto.focus();
      } else if (boton.getAttribute("aria-expanded") === "true") {
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

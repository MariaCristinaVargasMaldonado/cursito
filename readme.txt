Grupo de Aplicaciones Web Avanzadas 
Integrantes: 
- Arancibia Crispin Mauricio Kevin 
- Gonzales Meneses Alex Yerson 
- Vargas Maldonado Maria Cristina

Grupo: 
- Bugsito

Es esta rama master se encuentra implementado las tareas que el profesor puede subir para enviar a sus estudiantes, teniendo un CRUD completo; donde la base de datos implementada
es MONGODB ATLAS, de la misma manera se implmento lo que es la cache estatica, la cache dinamica, con lo cual funciona de manera Offline las vistas, el indexdb se implemento y
este se actualiza al crear una nueva tareas y rescata de la base de datos los datos y los muestra (es lo que se encuentra sin estilos), en la parte inferior de la aplicacion web,
sin embargo no se logro que funcione de manera Offline, se tuvo muchos problemas en esa parte, el indexDB esta con el nombre de listaTareas, donde muestra los ids, title y 
description, con los mismo datos de la DB, todo esto se intento unir con un login pero no se logro implementarlo ya que hubo muchos problemas en las rutas, al final no se logro; 
en la rama Login se ve algunas pruebas que se hizo pero sin exito.

En la rama notificaciones se tiene la implementacion de las notificaciones y subir imagenes.

Otra parte que no se pudo implementar pero igual se hizo se encuentra en: 
https://github.com/AlexGonzalesMeneses/Bugsito-awa-pwa-ionic

Para hacer correr la app se debe hacer correr los siguientes comandos:

1 npm run webpack
2 npm run dev

En caso de dar error implementar los modulos que se muestren en la consola

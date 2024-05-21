const alumnos = [{
    nombre: 'Lucas Senessi',
    email: 'lucassenessi@gmail.com',
    materia: 'Física, Matemática, TAC, Grabado',
},{
    nombre: 'Juan Pelotas',
    email: 'juanp@gmail.com',
    materia: 'Matemática'
},{
    nombre: 'July3p',
    email: 'july3p@gmail.com',
    materia: 'Ética'
},{
    nombre: 'Joel XD',
    email: 'joel@gmail.com',
    materia: 'Recreo'
},{
    nombre: 'Eustaquia',
    email: 'euu@gmail.com',
    materia: 'Literatura'
}];

const boton = document.querySelector('.btn-confirmar');
const contenedor = document.querySelector('.grid-container');

for (alumno in alumnos) {
    let datos = alumnos[alumno];
    let nombre = datos['nombre'];
    let email = datos['email'];
    let materia = datos['materia'];
    let htmlCode = `
    <div class="grid-item nombre">${nombre}</div>
    <div class="grid-item email">${email}</div>
    <div class="grid-item materia">${materia}</div>
    <div class="grid-item semana">
        <select class="semana-elegida">
            <option value="semana 1">Semana 1</option>
            <option value="semana 2">Semana 2</option>
        </select>
    </div>`;
    document.querySelector('.grid-container').innerHTML+= htmlCode;
};

boton.addEventListener('click', () => {
    let confirmar = confirm('Querés confirmar las mesas ?');
    if (confirmar) {
        document.body.removeChild(boton);
        let elementos = document.querySelectorAll('.semana');
        let semanasElegidas = document.querySelectorAll('.semana-elegida');
        for (elemento in elementos) {
        semana = elementos[elemento];
        semana.innerHTML = semanasElegidas[elemento].value;
        }
    }
});
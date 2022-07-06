const getTitulo = () => {
    return new Promise(resolve => {
        const titulo = "Inicio";
        setTimeout(() => {
            resolve(titulo);
        }, 3000)
    })
}
export default getTitulo;
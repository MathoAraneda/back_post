export const salidaAllPosts = (data) => {
    const _data = [];

    data.forEach(element => {
        _data.push({
            id: element.idpost,
            Nombre: element.name,
            Descripcion: element.description
        });
    });
    return _data;

}
import {    TB_POST,
            Op, 
            db
 } from "../Entities/Entities.js";
import { Salida } from "../utils.js";
import { salidaAddPost, salidaAllPosts } from "./mappers/posts.js";

const allPosts = async() => {
    const posts = await TB_POST.findAll();
    return posts;
}

export const getPosts_Internal = async() => {
    const salida = new Salida();
    try {
        const posts = await allPosts();

        salida.data = salidaAllPosts(posts);
        salida.codeNumber = 200;
        salida.message = "ok";

        return salida;
    } catch (error) {
        salida.codeNumber = 500;
        salida.message = "Error al obtener los posts";
        salida.error = `Error: ${error?.message}`;
        return salida;
    }
   
}

export const getPostById_Internal = async(idpost) => {
    const salida = new Salida();
    try {
        if(idpost > 0)
        {
            const post = await TB_POST.findOne({where: {idpost}});
            if(post === null)
            {
                salida.codeNumber = 404;
                salida.message = "Post no encontrado";
            }
            else
            {
                salida.data = post;
                salida.codeNumber = 200;
                salida.message = "ok";
            } 
        }else{
            salida.codeNumber = 402;
            salida.message = "ID de post inválido";
        }

        return salida;
    } catch (error) {
        salida.codeNumber = 500;
        salida.message = "Error al obtener el post";
        salida.error = `Error: ${error?.message}`;
        return salida;
    }
    
}

const existePost = async(Name) => {
    let name = `${Name}`.trimStart().trimEnd();
    const post = await TB_POST.findOne({where: {name}});
    return post !== null;
}

export const addPost_Internal = async(base) => {
    const salida = new Salida();
    const { Name = "", Description = "" } = base;

    try {

        let existe = await existePost(Name);
        if(existe)
        {
            salida.codeNumber = 400;
            salida.message = "Post ya existe";
            return salida;
        }
        
        let nuevo;
        await db.sequelize.transaction(async (t) => {
            nuevo = await TB_POST.create({
                name: Name,
                description: Description
            }, { transaction: t });
        });


        salida.data = salidaAddPost(nuevo);
        salida.codeNumber = 201;
        salida.message = "Post creado correctamente";
        return salida;
    } catch (error) {
        salida.codeNumber = 500;
        salida.message = "Error al crear el post";
        salida.error = `Error: ${error?.message}`;
        return salida;
    }
}

const existePostById = async(idpost) => {
    if(isNaN(idpost) || idpost <= 0) return false;
    const post = await TB_POST.findOne({where: {idpost}});
    return post !== null;
}

export const deletePost_Internal = async(idpost) => {
    const salida = new Salida();
    try {
        let existe = await existePostById(idpost);
        if(!existe)
        {
            salida.codeNumber = 404;
            salida.message = "Post no encontrado";
            return salida;
        }

        await db.sequelize.transaction(async (t) => {
            await TB_POST.destroy({
              where: { idpost },
              transaction: t 
            });
        });

        salida.data = idpost;
        salida.codeNumber = 200;
        salida.message = "Post eliminado correctamente";
        return salida;
    } catch (error) {
        salida.codeNumber = 500;
        salida.message = "Error al eliminar el post";
        salida.error = `Error: ${error?.message}`;
        return salida; 
    }

}

// si deja el filtro vacio, se envian todos los posts
export const getPostByName_Internal = async(filtro) => {
    const salida = new Salida();
    try {

        let parametro = JSON.parse(filtro);
        let _name = `${parametro.name}`.trimStart().trimEnd();
        if(_name.length === 0)
        {
            const posts = await allPosts();
            salida.data = salidaAllPosts(posts);
            salida.codeNumber = 200;
            salida.message = "Sin registros, pero se envian todos los posts";
            return salida;
        }

        const post = await TB_POST.findOne({where: {name: _name}});
        if(post === null)
        {
            salida.codeNumber = 404;
            salida.message = "Post no encontrado";
            salida.data = null;
        }
        else
        {
            salida.data = salidaAllPosts([post]);
            salida.codeNumber = 200;
            salida.message = "ok";
        }

        return salida;

    } catch (error) {
        salida.codeNumber = 500;
        salida.message = "Error al buscar el post";
        salida.error = `Error: ${error?.message}`;
        return salida; 
    }
}
    

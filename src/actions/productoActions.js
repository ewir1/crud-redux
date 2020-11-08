import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  COMENZAR_EDICION_PRODUCTO,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
} from '../types';

import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      // insertar en la api
      await clienteAxios.post('/productos', producto);
      // si todo sale bien actualiza el satte
      dispatch(agregarProductoExito(producto));
      // Alerta
      Swal.fire('Corecto', 'El producto se agrego correctamente', 'success');
    } catch (error) {
      // si hay error cambia el state
      dispatch(agregarProductoError(true));
      // ALerta
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// si el producto se guarda en la db
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// si hay un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

// Funcion que descarga los productos de la db
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get('/productos');
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTO_ERROR,
  payload: true,
});

// Selecciona y elimna el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      Swal.fire(
        'Eliminado!',
        'El producto se elimino correctamente.',
        'success'
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

// Edita un registro en la api y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto));
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true,
});

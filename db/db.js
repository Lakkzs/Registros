const  { sql, sql_conn, objeto_resultado, objeto_resultado2 } = require('../config/conexion')

const registro = {
    registrar: async (data) => {
        try {
            let resultado = await sql_conn.request()
            .input('NOMBRES_REG', sql.VarChar, data.txtNombre)
            .input('APELLIDOS_REG', sql.VarChar, data.txtApellido)
            .input('CORREO_REG', sql.VarChar, data.txtCorreo)
            .input('TELEFONO_REG', sql.VarChar, data.txtTelefono)
            .input('WHATSAPP_REG', sql.VarChar, data.txtWhatsapp)
            .input('EDAD_REG', sql.VarChar, data.txtEdad)
            .input('GENERO_REG', sql.VarChar, data.txtGenero)
            .input('CALLE_REG', sql.VarChar, data.txtCalle)
            .input('NEXTERIOR_REG', sql.VarChar, data.txtNum_Exterior)
            .input('NINTERIOR_REG', sql.VarChar, data.txtNum_Interior)
            .input('COLONIA_REG', sql.VarChar, data.txtColonia)
            .input('CODPOSTAL_REG', sql.VarChar, data.txtCP)
            .input('CIUDAD_REG', sql.VarChar, data.txtCiudad)
            .input('ESTADO_REG', sql.VarChar, data.txtEstado)
            .query(`EXEC EVENTO_REGISTRO @NOMBRES_REG, @APELLIDOS_REG, @CORREO_REG, @TELEFONO_REG, @WHATSAPP_REG, @EDAD_REG, @GENERO_REG, @CALLE_REG, @NEXTERIOR_REG, @NINTERIOR_REG, @COLONIA_REG, @CODPOSTAL_REG, @CIUDAD_REG, @ESTADO_REG`)
            return objeto_resultado(resultado)
        } catch (error) {
            throw error
        }
    }
}
const login = {
    ingresar: async (data) => {
        try {
            let resultado = await sql_conn.request()
            .input('USUARIO_REG', sql.VarChar, data.txtCorreo)
            .input('CONTRASENA_REG', sql.VarChar, data.txtContrasena)
            .query(`EXEC EVENTO_LOGIN @USUARIO_REG, @CONTRASENA_REG`)
            return objeto_resultado(resultado)
        } catch (error) {
            throw error
        }
    }
}
const codes = {
    guardarCodigo: async (data, code) => {
        try {
            let resultado = await sql_conn.request()
            .input('CORREO_REG', sql.VarChar, data.txtCorreo)
            .input('CODIGO_CODES', sql.VarChar, code)
            .query(`EXEC EVENTO_CODIGO @CORREO_REG, @CODIGO_CODES`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    }
}
const verify = {
    verificarCodigo: async (data) => {
        try {
            let resultado = await sql_conn.request()
            .input('CORREO_REG', sql.VarChar, data.txtCorreo)
            .input('CODIGO_CODES', sql.VarChar, data.txtVerificacion)
            .query(`EXEC EVENTO_VERIFICAR_REGISTRO @CORREO_REG, @CODIGO_CODES`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    }
}
const changeStatusCode = {
    changeStatus: async(data) => {
        try{
            let resultado = await sql_conn.request()
            .input('CORREO_REG', sql.VarChar, data.body.txtCorreo)
            .input('CODIGO_CODES', sql.VarChar, data.body.txtVerificacion)
            .query(`EXEC EVENTO_CAMBIAR_VERIFICACION_ESTATUS @CORREO_REG, @CODIGO_CODES`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    }
}
const tempPass = {
    InsertTemporalPass: async(data, pass) => {
        try{

            let resultado = await sql_conn.request()
            .input('CORREO_REG', sql.VarChar, data.body.txtCorreo)
            .input('CONTRASENA', sql.VarChar, pass)
            .query(`EXEC EVENTO_INSERTAR_CONTRA_TEMPORAL @CORREO_REG, @CONTRASENA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    RecoupPass: async(data, pass) => {
        try{

            let resultado = await sql_conn.request()
            .input('CORREO_REG', sql.VarChar, data.body.txtCorreo)
            .input('CONTRASENA', sql.VarChar, pass)
            .query(`EXEC EVENTO_RECUPERAR_CONTRASENA @CORREO_REG, @CONTRASENA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
}
const loadTable = {
    loadTableData: async (req, res) => {
        try {
            let p, c
            console.log(555555555, req)
            if(req.p == undefined){
                req.p = 0
            }
            if(req.p || req.p == 0){
                p = (parseInt(req.p) + 1)
            }
            if(req.c){
                c = parseInt(req.c)
            }
            console.log(p, c)
            let resultado = await sql_conn.request()
            .input('PageNumber', sql.Int, p)
            .input('RowsOfPage', sql.Int, c)
            .query('EXEC EVENTO_PAGINACION @PageNumber, @RowsOfPage')
            console.log(999, resultado.recordsets)
            return objeto_resultado2(resultado)
        } catch (error) {
            console.log(error)
        }
    }
}
const loadInfo = {
    loadInfoData: async (req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_NUMERO_TOTAL')
            return objeto_resultado2(resultado)
        }
        catch (error){
            console.log(error)
        }
    },
    loadInfoMonths: async(req, res) => {
        try {
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_ALTAS_ANIO')
            return objeto_resultado2(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoYears: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_ALTAS_AÑOS_ANTERIORES')
            return objeto_resultado2(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadInfoBirthday: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_FECHA_CUMPLEANOS')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadInfoDate: async(req,res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_FECHA_HOY')
            return objeto_resultado2(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadInfoAniversary: async(req,res) =>{
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_ANIVERSARIOS')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadEmpresas: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_EMPRESAS')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    }
}
const altas = {
    altaColaborador: async(req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombres)
            .input('APELLIDO', sql.VarChar, req.txtApellidos)
            .input('CORREO', sql.VarChar, req.txtCorreo)
            .input('EMPRESA', sql.Int, datos.id_empresa)
            .input('USUARIO', sql.Int, 3)
            .query(`EXEC EVENTO_CREAR_COLABORADOR @NOMBRE, @APELLIDO, @CORREO, @EMPRESA, @USUARIO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaDepartamento: async(req, datos, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombre)
            .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
            // .input('IMAGEN', sql.VarBinary, 0x0123)
            .input('EMPRESA', sql.Int, datos.id_empresa)
            .query(`EXEC EVENTO_CREAR_DEPARTAMENTO @NOMBRE, @DESCRIPCION, 0x0123, @EMPRESA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaPuestos: async(req, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombre)
            .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
            .input('MISION', sql.VarChar, req.txtMision)
            .input('OBJETIVO', sql.VarChar, req.txtObjetivo)
            .input('DEPARTAMENTO', sql.VarChar, req.txtDepartamento)
            .query(`EXEC EVENTO_CREAR_PUESTO @NOMBRE, @DESCRIPCION, @MISION, @OBJETIVO, @DEPARTAMENTO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaEmpresa: async(req, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombre)
            .input('RAZON_SOCIAL', sql.VarChar, req.txtRazon_Social)
            .input('RFC', sql.VarChar, req.txtRFC)
            .input('CALLE', sql.VarChar, req.txtCalle)
            .input('COLONIA', sql.VarChar, req.txtColonia)
            .input('N_EXTERIOR', sql.VarChar, req.txtNum_Exterior)
            .input('N_INTERIOR', sql.VarChar, req.txtNum_Interior)
            .input('COD_POSTAL', sql.VarChar, req.txtCP)
            .input('PAIS', sql.VarChar, req.txtPais)
            .input('ESTADO', sql.VarChar, req.txtEstado)
            .input('CIUDAD', sql.VarChar, req.txtCiudad)
            .query(`EXEC EVENTO_CREAR_EMPRESA @NOMBRE, @RAZON_SOCIAL, @RFC, @CALLE, @COLONIA, @N_EXTERIOR, @N_INTERIOR, @COD_POSTAL, @PAIS, @ESTADO, @CIUDAD, 0X0123, 0X0123, 0X0123`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaInfoLaboral: async(req, res) => {
        try{
            console.log(req)
            if(req.txtFecha_Salida == ''){
                let resultado = await sql_conn.request()
                .input('FOLIO',sql.Int,req.txtColaborador)
                .input('FECHA_INGRESO',sql.Date,req.txtFecha_Entrada)
                .input('TRANSITORIO',sql.VarChar,req.txtTransitorio)
                .input('DEPARTAMENTO',sql.VarChar,req.txtDepartamento)
                .input('PUESTO',sql.VarChar,req.txtPuesto)
                .query(`EXEC EVENTO_CREAR_INFO_LABORAL @FOLIO,@FECHA_INGRESO,NULL,@TRANSITORIO,@DEPARTAMENTO,@PUESTO`)
                return objeto_resultado(resultado)
            }else{
                let resultado = await sql_conn.request()
                .input('FOLIO',sql.Int,req.txtColaborador)
                .input('FECHA_INGRESO',sql.Date,req.txtFecha_Entrada)
                .input('FECHA_SALIDA',sql.Date,req.txtFecha_Salida)
                .input('TRANSITORIO',sql.VarChar,req.txtTransitorio)
                .input('DEPARTAMENTO',sql.VarChar,req.txtDepartamento)
                .input('PUESTO',sql.VarChar,req.txtPuesto)
                .query(`EXEC EVENTO_CREAR_INFO_LABORAL @FOLIO,@FECHA_INGRESO,@FECHA_SALIDA,@TRANSITORIO,@DEPARTAMENTO,@PUESTO`)
                return objeto_resultado(resultado)
            }
        }catch(error){
            console.log(error)
        }
    },
    altaInfoAdicional: async (req,res) => {
        try{
            if(req.txtNumero == '' || req.txtNumero == undefined || req.txtNumero== NaN)
            {
                let resultado = await sql_conn.request()
                .input('FOLIO',sql.Int,req.txtColaborador)
                .input('ESTADO',sql.VarChar,req.txtEstado)
                .input('DEPENDENCIA',sql.VarChar,req.txtDependencia)
                .query(`EXEC EVENTO_CREAR_INFO_ADICIONAL @FOLIO,@ESTADO,@DEPENDENCIA,NULL`)
                return objeto_resultado(resultado)

            }else{
                let resultado = await sql_conn.request()
                .input('FOLIO',sql.Int,req.txtColaborador)
                .input('ESTADO',sql.VarChar,req.txtEstado)
                .input('DEPENDENCIA',sql.VarChar,req.txtDependencia)
                .input('NUMERO',sql.VarChar,req.txtNumero)
                .query(`EXEC EVENTO_CREAR_INFO_ADICIONAL @FOLIO,@ESTADO,@DEPENDENCIA,@NUMERO`)
                return objeto_resultado(resultado)
            }
        }catch(error){
            console.log(error) 
        }
    },
    altaTipoUsuario: async (req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombre)
            .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
            .input('EMPRESA', sql.Int, datos.id_empresa)
            .query(`EXEC EVENTO_CREAR_USUARIO @NOMBRE, @DESCRIPCION, @EMPRESA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaDepartamentos: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_DEPARTAMENTOS')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaColaboradores: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .input('EMPRESA', sql.Int, req.id_empresa)
            .query('EXEC CONSULTA_COLABORADORES @EMPRESA')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaInfoEmpresa: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .input ('DEPARTAMENTO', sql.VarChar, req.value)
            .query('EXEC CONSULTA_PUESTOS @DEPARTAMENTO')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaPuestos: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .input ('DEPARTAMENTO', sql.VarChar, req.txtDepartamento)
            .query('EXEC CONSULTA_PUESTOS @DEPARTAMENTO')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaPerfiles: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CONSULTA_TRANSITORIO')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaDatosColaboradores: async(req, res) => {
        try {
            let resultado = await sql_conn.request()
            .input('FOLIO', sql.Int, req.txtColaborador)
            .query('EXEC CONSULTA_DATOS_COLABORADORES @FOLIO')
            return objeto_resultado(resultado)
        }
        catch(error){
            console.log(error)
        }
    },
    cargaInfoLaboral: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .input('FOLIO', sql.Int, req.value)
            .query('EXEC CONSULTA_INFO_LABORAL @FOLIO')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaContactosEmergencia: async(req, res) => {
        try{
            console.log(req)
            let resultado = await sql_conn.request()
            .input('FOLIO', sql.Int, req.txtColaborador)
            .query('EXEC CARGAR_DATOS_CONTACTOS @FOLIO')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaMunicipios: async(req, res) => {
        try{
            console.log(req)
            let resultado = await sql_conn.request()
            .input('ESTADO', sql.Int, req.value)
            .query('EXEC CARGAR_MUNICIPIOS @ESTADO')
            console.log(resultado)
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaInfo: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .input('FOLIO', sql.Int, parseInt(req.body.txtColaborador))
            .query('EXEC CONSULTA_INFO_COLABORADORES @FOLIO')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    cargaEstados: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC CARGAR_ESTADOS')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    altaTransitorios: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombre)
            .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
            .input('USUARIO', sql.Int, 3)
            .query(`EXEC EVENTO_CREAR_TRANSITORIO @NOMBRE, @DESCRIPCION, @USUARIO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaContactos: async(req, res) => {
        try{
            
            if(req.txtParentesco == 'Otro' && req.txtParentesco2 != 'Otro' && req.txtParentesco3 != 'Otro'){
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtOtro)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtParentesco2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtParentesco3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)

            }else if(req.txtParentesco2 == 'Otro'&& req.txtParentesco != 'Otro' && req.txtParentesco3 != 'Otro'){
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtParentesco)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtOtro2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtParentesco3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)

            }else if(req.txtParentesco3 == 'Otro' && req.txtParentesco2 != 'Otro' && req.txtParentesco != 'Otro'){
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtParentesco)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtParentesco2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtOtro3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)

            }else if(req.txtParentesco == 'Otro' && req.txtParentesco2 == 'Otro' && req.txtParentesco3 != 'Otro' ){
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtOtro)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtOtro2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtParentesco3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)

            }else if(req.txtParentesco == 'Otro' && req.txtParentesco3 == 'Otro' && req.txtParentesco2 != 'Otro'){
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtOtro)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtParentesco2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtOtro3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)

            }else if(req.txtParentesco2 == 'Otro' && req.txtParentesco3 == 'Otro' && req.txtParentesco != 'Otro'){
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtParentesco)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtOtro2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtOtro3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)

            }else{
                let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('APELLIDO', sql.VarChar, req.txtApellido)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('PARENTESCO', sql.VarChar, req.txtParentesco)
                .input('NOMBRE2', sql.VarChar, req.txtNombre2)
                .input('APELLIDO2', sql.VarChar, req.txtApellido2)
                .input('CELULAR2', sql.VarChar, req.txtCelular2)
                .input('PARENTESCO2', sql.VarChar, req.txtParentesco2)
                .input('NOMBRE3', sql.VarChar, req.txtNombre3)
                .input('APELLIDO3', sql.VarChar, req.txtApellido3)
                .input('CELULAR3', sql.VarChar, req.txtCelular3)
                .input('PARENTESCO3', sql.VarChar, req.txtParentesco3)
                .query(`EXEC EVENTO_CREAR_CONTACTO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CELULAR, @PARENTESCO, @NOMBRE2, @APELLIDO2, @CELULAR2, @PARENTESCO2, @NOMBRE3, @APELLIDO3, @CELULAR3, @PARENTESCO3`)
                return objeto_resultado(resultado)
            }
           
        }catch(error){
            console.log(error)
        }   
    },
}
const infoColaborador = {
    altaInfoEstudios: async(req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
            .input('FOLIO', sql.Int, datos.folio)
            .input('ESCUELA', sql.VarChar, req.txtEscuela)
            .input('CARRERA', sql.VarChar, req.txtCarrera)
            .input('HORA_ENTRADA', sql.VarChar, req.txtEntrada)
            .input('HORA_SALIDA', sql.VarChar, req.txtSalida)
            .input('PERIODO', sql.VarChar, req.txtPeriodo)
            .input('PERIODICIDAD', sql.VarChar, req.txtPeriodicidad)
            .query(`EXEC EVENTO_CREAR_INFO_ESTUDIOS_COLABORADOR @FOLIO, @ESCUELA, @CARRERA, @HORA_ENTRADA, @HORA_SALIDA, @PERIODO, @PERIODICIDAD`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaInfoSalud: async(req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
            .input('FOLIO', sql.Int, datos.folio)
            .input('SANGRE', sql.VarChar, req.txtSangre)
            .input('ALERGIAS', sql.VarChar, req.txtAlergias)
            .input('PADECIMIENTOS', sql.VarChar, req.txtPadecimientos)
            .input('DISCAPACIDAD', sql.VarChar, req.txtDiscapacidad)
            .input('VACUNACION_COVID', sql.VarChar, req.txtCovid)
            .input('ANTECEDENTES', sql.VarChar, req.txtAntecedentes)
            .query(`EXEC EVENTO_CREAR_INFO_SALUD_COLABORADOR @FOLIO, @SANGRE, @ALERGIAS, @PADECIMIENTOS, @DISCAPACIDAD, @VACUNACION_COVID, @ANTECEDENTES`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = {
    registro, login, codes, verify, changeStatusCode, tempPass, loadTable, loadInfo, altas, infoColaborador
}




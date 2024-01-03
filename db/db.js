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
            
            // if(p != NaN && c == NaN){
            //     console.log(1)
            //     let resultado = await sql_conn.request()
            //     .input('PageNumber', sql.Int, p)
            //     .query('EXEC EVENTO_PAGINACION @PageNumber, 20')
            //     return objeto_resultado(resultado)
            // }else if(p == NaN && c != NaN){
            //     console.log(2)
            //     let resultado = await sql_conn.request()
            //     .input('RowsOfPage', sql.Int, c)
            //     .query('EXEC EVENTO_PAGINACION 1, @RowsOfPage')
            //     return objeto_resultado(resultado)
            // }else if(p != NaN && c != NaN){
            //     console.log(3)
            //     let resultado = await sql_conn.request()
            //     .input('PageNumber', sql.Int, p)
            //     .input('RowsOfPage', sql.Int, c)
            //     .query('EXEC EVENTO_PAGINACION @PageNumber, @RowsOfPage')
            //     return objeto_resultado(resultado)
            // }else if(p == NaN && c == NaN){
            //     console.log(4)
            //     let resultado = await sql_conn.request()
            //     .query('EXEC EVENTO_PAGINACION 1, 20')
            //     return objeto_resultado(resultado)
            // }
        } catch (error) {
            console.log(error)
        }
    }
}
const loadInfo = {
    loadInfoData: async (req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC NUMERO_TOTAL')
            return objeto_resultado2(resultado)
        }
        catch (error){
            console.log(error)
        }
    },
    loadInfoMonths: async(req, res) => {
        try {
            let resultado = await sql_conn.request()
            .query('EXEC ALTAS_AÑO')
            return objeto_resultado2(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoYears: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC ALTAS_AÑOS_ANTERIORES')
            return objeto_resultado2(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadInfoBirthday: async(req, res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC FECHA_CUMPLEANOS')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadInfoDate: async(req,res) => {
        try{
            let resultado = await sql_conn.request()
            .query('EXEC FECHA_HOY')
            return objeto_resultado2(resultado)
        }catch(error){
            console.log(error)
        }
    },
    loadInfoAniversary: async(req,res) =>{
        try{
            let resultado = await sql_conn.request()
            .query('EXEC ANIVERSARIOS')
            return objeto_resultado(resultado)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = {
    registro, login, codes, verify, changeStatusCode, tempPass, loadTable, loadInfo
}




const { sql, sql_conn, objeto_resultado, objeto_resultado2 } = require('../config/conexion')
const { data } = require('../controllers/ctrl_table')

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
    changeStatus: async (data) => {
        try {
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
    InsertTemporalPass: async (data, pass) => {
        try {

            let resultado = await sql_conn.request()
                .input('CORREO_REG', sql.VarChar, data.body.txtCorreo)
                .input('CONTRASENA', sql.VarChar, pass)
                .query(`EXEC EVENTO_INSERTAR_CONTRA_TEMPORAL @CORREO_REG, @CONTRASENA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    RecoupPass: async (data, pass) => {
        try {

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
            if (req.p == undefined) {
                req.p = 0
            }
            if (req.p || req.p == 0) {
                p = (parseInt(req.p) + 1)
            }
            if (req.c) {
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
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_NUMERO_TOTAL @EMPRESA')
            return objeto_resultado2(resultado)
        }
        catch (error) {
            console.log(error)
        }
    },
    loadNextBirthday: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_FECHA_PROXIMOS_CUMPLEANOS @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoMonths: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_ALTAS_ANIO @EMPRESA')
            return objeto_resultado2(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadChartInfoMonths: async (req, res) => {
        try {
            let m = parseInt(req.value)
            let resultado = await sql_conn.request()
                .input('MESESATRAS', sql.Int, m)
                .query(`EXEC CARGAR_MESES_GRAFICO @MESESATRAS`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadDayOfEntry: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.folio)
                .query(`EXEC CONSULTA_INGRESO @FOLIO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadVacations: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.folio)
                .query(`EXEC CONSULTA_DIAS_VACACIONES @FOLIO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadEconomicDays: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.folio)
                .query(`EXEC CONSULTA_DIAS_ECONOMICOS @FOLIO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadBirthdayAlert: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.folio)
                .query(`EXEC ALERTA_PROXIMOS_CUMPLEANIOS @FOLIO`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadChartInfoYears: async (req, res) => {
        try {
            let m = parseInt(req.value)
            let resultado = await sql_conn.request()
                .input('ANIOSATRAS', sql.Int, m)
                .query(`EXEC CARGAR_ANIOS_GRAFICO @ANIOSATRAS`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoYears: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_ALTAS_AÑOS_ANTERIORES @EMPRESA')
            return objeto_resultado2(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoBirthday: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_FECHA_CUMPLEANOS @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    CargarColaboradoresDepartamento: async (req, res) => {
        try {

            let resultado = await sql_conn.request()
                .input('ID_DEPARTAMENTO', sql.Int, req)
                .query('EXEC CONSULTA_COLABORADORES_DEPARTAMENTO @ID_DEPARTAMENTO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoDate: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .query('EXEC CONSULTA_FECHA_HOY')
            return objeto_resultado2(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    loadInfoAniversary: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_ANIVERSARIOS @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
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
    },
    cargarEventos: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_CARGAR_CALENDARIO_DIAS_FESTIVOS @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    rt_buscarDias: async (req, res) => {
        let datos = req.body
        let resultado = await db.altas.cargaVacaciones(datos)
        console.log('----------------VACACIONES DIAS:', resultado.datos[0])
        if (resultado.datos[0] != undefined) {
            res.render('partials/editarVacaciones', { DIAS_VACACIONES: resultado.datos[0].DIAS_VACACIONES, name: "txtDias", id: "txtDias" }, (error, html) => {
                res.json({ html })
            })
        } else {
            res.render('partials/editarVacaciones', { name: "txtDias", id: "txtDias" }, (error, html) => {
                res.json({ html })
            })
        }
    },
    
}
const altas = {
    altaColaborador: async (req, datos, res) => {
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
    altaDepartamento: async (req, datos, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
            .input('NOMBRE', sql.VarChar, req.txtNombre)
            .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
            .input('IMAGEN', sql.VarChar, req.txtImagen)
            .input('EMPRESA', sql.Int, datos.id_empresa)
            .query(`EXEC EVENTO_CREAR_DEPARTAMENTO @NOMBRE, @DESCRIPCION, @IMAGEN, @EMPRESA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaPuestos: async (req, datos, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
                .input('MISION', sql.VarChar, req.txtMision)
                .input('OBJETIVO', sql.VarChar, req.txtObjetivo)
                .input('DEPARTAMENTO', sql.VarChar, req.txtDepartamento)
                .input('EMPRESA', sql.Int, datos.id_empresa)
                .query(`EXEC EVENTO_CREAR_PUESTO @NOMBRE, @DESCRIPCION, @MISION, @OBJETIVO, @DEPARTAMENTO, @EMPRESA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaEmpresa: async (req, res) => {
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
    altaInfoLaboral: async (req, res) => {
        try {
            console.log(666, req)
            if (req.txtFecha_Salida == '') {
                let resultado = await sql_conn.request()
                    .input('FOLIO', sql.Int, req.txtColaborador)
                    .input('FECHA_INGRESO', sql.Date, req.txtFecha_Entrada)
                    .input('TRANSITORIO', sql.VarChar, req.txtTransitorio)
                    .input('DEPARTAMENTO', sql.VarChar, req.txtDepartamento)
                    .input('PUESTO', sql.VarChar, req.txtPuesto)
                    .query(`EXEC EVENTO_CREAR_INFO_LABORAL @FOLIO,@FECHA_INGRESO,NULL,@TRANSITORIO,@DEPARTAMENTO,@PUESTO`)
                return objeto_resultado(resultado)
            } else {
                let resultado = await sql_conn.request()
                    .input('FOLIO', sql.Int, req.txtColaborador)
                    .input('FECHA_INGRESO', sql.Date, req.txtFecha_Entrada)
                    .input('FECHA_SALIDA', sql.Date, req.txtFecha_Salida)
                    .input('TRANSITORIO', sql.VarChar, req.txtTransitorio)
                    .input('DEPARTAMENTO', sql.VarChar, req.txtDepartamento)
                    .input('PUESTO', sql.VarChar, req.txtPuesto)
                    .query(`EXEC EVENTO_CREAR_INFO_LABORAL @FOLIO,@FECHA_INGRESO,@FECHA_SALIDA,@TRANSITORIO,@DEPARTAMENTO,@PUESTO`)
                return objeto_resultado(resultado)
            }
        } catch (error) {
            console.log(error)
        }
    },
    altaInfoAdicional: async (req, res) => {
        try {
            if (req.txtNumero == '' || req.txtNumero == undefined || req.txtNumero == NaN) {
                let resultado = await sql_conn.request()
                    .input('FOLIO', sql.Int, req.txtColaborador)
                    .input('ESTADO', sql.VarChar, req.txtEstado)
                    .input('DEPENDENCIA', sql.VarChar, req.txtDependencia)
                    .query(`EXEC EVENTO_CREAR_INFO_ADICIONAL @FOLIO,@ESTADO,@DEPENDENCIA,NULL`)
                return objeto_resultado(resultado)

            } else {
                let resultado = await sql_conn.request()
                    .input('FOLIO', sql.Int, req.txtColaborador)
                    .input('ESTADO', sql.VarChar, req.txtEstado)
                    .input('DEPENDENCIA', sql.VarChar, req.txtDependencia)
                    .input('NUMERO', sql.VarChar, req.txtNumero)
                    .query(`EXEC EVENTO_CREAR_INFO_ADICIONAL @FOLIO,@ESTADO,@DEPENDENCIA,@NUMERO`)
                return objeto_resultado(resultado)
            }
        } catch (error) {
            console.log(error)
        }
    },
    altaVacaciones: async (req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('ANIOS', sql.Int, req.txtAnios)
                .input('DIAS_VACACIONES', sql.Int, req.txtDias)
                .query(`EXEC ACTUALIZA_VACACIONES @ANIOS, @DIAS_VACACIONES`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaDias: async (req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('DIAS', sql.VarChar, req.txtTiempo)
                .input('DIAS_ECONOMICOS', sql.Int, req.txtDiasEconomicos)
                .query(`EXEC ACTUALIZA_DIAS @DIAS, @DIAS_ECONOMICOS`)
            return objeto_resultado(resultado)
        } catch (error) {
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
    cargaDepartamentos: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_DEPARTAMENTOS @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaColaboradores: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_COLABORADORES @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaColaboradores2: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req)
                .query('EXEC CONSULTA_COLABORADORES @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaInfoEmpresa: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('DEPARTAMENTO', sql.VarChar, req.value)
                .query('EXEC CONSULTA_PUESTOS @DEPARTAMENTO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaPuestos: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('DEPARTAMENTO', sql.VarChar, req.txtDepartamento)
                .query('EXEC CONSULTA_PUESTOS @DEPARTAMENTO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaTiempos: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .query('EXEC CARGA_TIEMPO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaPerfiles: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_TRANSITORIO @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaDatosColaboradores: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .query('EXEC CONSULTA_DATOS_COLABORADORES @FOLIO')
            return objeto_resultado(resultado)
        }
        catch (error) {
            console.log(error)
        }
    },
    cargaVacaciones: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('ANIOS', sql.Int, req.txtAnios)
                .query('EXEC CONSULTA_VACACIONES @ANIOS')
            return objeto_resultado(resultado)
        }
        catch (error) {
            console.log(error)
        }
    },
    cargaDashboard: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.txtColaborador))
                .query('EXEC CONSULTA_DASHBOARD @FOLIO')
            return objeto_resultado2(resultado)
        }
        catch (error) {
            console.log(error)
        }
    },
    cargaDias: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('TIEMPO', sql.VarChar, req.txtTiempo)
                .query('EXEC CONSULTA_DIAS @TIEMPO')
            return objeto_resultado(resultado)
        }
        catch (error) {
            console.log(error)
        }
    },

    cargaInfoLaboral: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.colaborador))
                .query('EXEC CONSULTA_INFO_LABORAL @FOLIO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaContactosEmergencia: async (req, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
                .query('EXEC CARGAR_DATOS_CONTACTOS @FOLIO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaMunicipios: async (req, res) => {
        try {
            console.log(666, req)
            let resultado = await sql_conn.request()
                .input('ESTADO', sql.VarChar, req.value)
                .query('EXEC CARGAR_MUNICIPIOS @ESTADO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaInfo: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.body.txtColaborador))
                .query('EXEC CONSULTA_INFO_COLABORADORES @FOLIO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaInfoEstudios: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.colaborador))
                .query('EXEC CONSULTA_INFO_ESTUDIOS @FOLIO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaInfoSalud: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.colaborador))
                .query('EXEC CONSULTA_INFO_SALUD @FOLIO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaInfoHobbies: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.txtColaborador))
                .query('EXEC CONSULTA_INFO_HOBBIES @FOLIO')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    cargaEstados: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .query('EXEC CARGAR_ESTADOS')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaTransitorios: async (req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('NOMBRE', sql.VarChar, req.txtNombre)
                .input('DESCRIPCION', sql.VarChar, req.txtDescripcion)
                .input('EMPRESA', sql.Int, datos.id_empresa)
                .query(`EXEC EVENTO_CREAR_TRANSITORIO @NOMBRE, @DESCRIPCION, @USUARIO @EMPRESA`)
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaContactos: async (req, res) => {
        try {

            if (req.txtParentesco == 'Otro' && req.txtParentesco2 != 'Otro' && req.txtParentesco3 != 'Otro') {
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

            } else if (req.txtParentesco2 == 'Otro' && req.txtParentesco != 'Otro' && req.txtParentesco3 != 'Otro') {
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

            } else if (req.txtParentesco3 == 'Otro' && req.txtParentesco2 != 'Otro' && req.txtParentesco != 'Otro') {
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

            } else if (req.txtParentesco == 'Otro' && req.txtParentesco2 == 'Otro' && req.txtParentesco3 != 'Otro') {
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

            } else if (req.txtParentesco == 'Otro' && req.txtParentesco3 == 'Otro' && req.txtParentesco2 != 'Otro') {
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

            } else if (req.txtParentesco2 == 'Otro' && req.txtParentesco3 == 'Otro' && req.txtParentesco != 'Otro') {
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

            } else {
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

        } catch (error) {
            console.log(error)
        }
    },
}
const infoColaborador = {
    altaInfoEstudios: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
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
    altaInfoSalud: async (req, datos, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, req.txtColaborador)
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
    altaInfoPrincipal: async (req, res) => {
        try {
            console.log(454545, req)
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.txtColaborador))
                .input('NOMBRE', sql.VarChar, req.txtNombres)
                .input('APELLIDO', sql.VarChar, req.txtApellidos)
                .input('CORREO', sql.VarChar, req.txtCorreo)
                .input('CORREO_ALT', sql.VarChar, req.txtCorreo_Alt)
                .input('CELULAR', sql.VarChar, req.txtCelular)
                .input('TELEFONO', sql.VarChar, req.txtTelefono)
                .input('FECHA_NAC', sql.Date, req.txtFecha_Nac)
                .input('GENERO', sql.VarChar, req.txtGenero)
                .input('CALLE', sql.VarChar, req.txtCalle)
                .input('COLONIA', sql.VarChar, req.txtColonia)
                .input('NUME', sql.VarChar, req.txtNum_Exterior)
                .input('NUMI', sql.VarChar, req.txtNum_Interior)
                .input('CP', sql.VarChar, req.txtCP)
                .input('PAIS', sql.VarChar, req.txtPais)
                .input('ESTADO', sql.VarChar, req.txtEstado)
                .input('CIUDAD', sql.VarChar, req.txtCiudad)
                .query('EXEC ALTA_INFO_COLABORADOR @FOLIO, @NOMBRE, @APELLIDO, @CORREO, @CORREO_ALT, @CELULAR, @TELEFONO, @FECHA_NAC, @GENERO, @CALLE, @COLONIA, @NUME, @NUMI, @CP, @PAIS, @ESTADO, @CIUDAD')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    altaInfoHobbies: async (req, res) => {
        try {
            let resultado = await sql_conn.request()
                .input('FOLIO', sql.Int, parseInt(req.txtColaborador))
                .input('HOBBIES', sql.VarChar, req.txtHobbies)
                .input('PASTEL', sql.VarChar, req.txtPastel)
                .input('MUSICA', sql.VarChar, req.txtMusica)
                .query('EXEC EVENTO_CREAR_INFO_HOBBIES @FOLIO, @HOBBIES, @PASTEL, @MUSICA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
}
const extras = {
    cargarFestivos: async (req, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
                .input('EMPRESA', sql.Int, req.id_empresa)
                .query('EXEC CONSULTA_CARGAR_FESTIVOS @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    },
    actualizarFestivos: async (req, filas, data, res) => {
        try {
            let arrayPrueba = []
            let arrayFinal = []
            let contador = 4
            console.log(Object.values(req))
            for (let i = 0; i < Object.values(req).length; i++) {
                arrayPrueba.push(Object.values(req)[i])
                if (i == contador) {
                    arrayFinal.push(arrayPrueba)
                    arrayPrueba = []
                    contador += 5
                }
            }
            console.log(arrayFinal)
            for (let i = 0; i < arrayFinal.length; i++) {
                sql_conn.request()
                    .input('ID', sql.Int, arrayFinal[i][0])
                    .input('DESCRIPCION', sql.VarChar, arrayFinal[i][1])
                    .input('CATEGORIA', sql.VarChar, arrayFinal[i][2])
                    .input('MES', sql.VarChar, arrayFinal[i][3])
                    .input('DIA', sql.VarChar, arrayFinal[i][4])
                    .input('EMPRESA', sql.Int, data.id_empresa)
                    .query('EXEC EVENTO_ACTUALIZAR_DIAS_FESTIVOS @ID, @DESCRIPCION, @CATEGORIA, @MES, @DIA, @EMPRESA')
            }
        } catch (error) {
            console.log(error)
        }
    },
    eliminarFecha: async (req, data, res) => {
        try {
            console.log(req)
            let resultado = await sql_conn.request()
                .input('ID', sql.Int, req.id)
                .input('EMPRESA', sql.Int, data.id_empresa)
                .query('EXEC EVENTO_ELIMINAR_FECHA @ID, @EMPRESA')
            return objeto_resultado(resultado)
        } catch (error) {
            console.log(error)
        }
    }
}

//const altaDocumentos = {
//    subirdocumentos: async(req, res) => {
//        try {
//            const resultado = req.body.get("nombreArchivo");
//            await db.CONSULTA_ALTA_DOCUMENTOS(resultado);
//            res.send("Documento(s) subidos(s) correctamente");
            //.input('ARCHIVO_ALTA_DOCUMENTOS', sql.VarChar, data.documents)
            //.query('EXEC CONSULTA_ALTAS_DOCUMENTOS')
            //return objeto_resultado(resultado)
//        } catch (error) {
//            console.log(error);
//            res.status(500).send("Error al procesar la solicitud ");
//        }
//    }
//}

const altaDocumentos = {
    subirDocumentos: async (req, res) => {
        try {
            const files = req.files;
            const results = [];

            for (const file of files) {
                const buffer = file.buffer;

                await sql_conn.connect();

                const request = sql_conn.request();
                request.input('ARCHIVO_ALTA_DOCUMENTOS', sql.VarBinary, buffer);
                const resultado = await request.execute('PRUEBA_ALTA_DOCUMENTOS');

                results.push(objeto_resultado(resultado));
            }

            return res.status(200).json(results);
        } catch (error) {
            throw error
        }
    }
}

module.exports = {
    registro, login, codes, verify, changeStatusCode, tempPass, loadTable, loadInfo, altas, infoColaborador, extras, altaDocumentos
}

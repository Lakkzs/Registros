const sql = require('mssql')
const sql_config = require('../config/credenciales').config1

let sql_conn = new sql.ConnectionPool(sql_config, (err) => {
    let date = new Date()
    if(err){
        console.log('No se pudo conectar a la BD, reintentando...', date)
        connectSQL()
    }else{
        console.log('Conectado a la BD', date)
    }
})

let connectSQL = () => {
    sql_conn.connect()
    .then(() => {
        console.log('Conectado a la BD')
    })
    .catch((err) => {
        if(err){
            let date = new Date()
            console.log('No se pudo conectad a la BD, reintentando...', date, err)
            setTimeout(() => {
                connectSQL()
            }, 2500)
        }
    })
}

const objeto_resultado = (resultado) => {
    if(resultado.recordsets.length > 1) {
        return {estatus: 'OK', datos: resultado.recordsets}
    }
    if(!resultado.recorset){
        return {estatus: 'OK', datos: resultado.recordset}
    }
    return {estatus: 'OK', datos: resultado.recordset}
}

module.exports = {
    sql_conn, sql, objeto_resultado
} 
import React from 'react'
import { View, Text  , SafeAreaView , Pressable , StyleSheet} from 'react-native'

function InformacionPaciente ({paciente , setModalPaciente , setPacienteEditar}) {

    const formatearFecha = fecha => {

        const nuevaFecha = new Date(fecha);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        return nuevaFecha.toLocaleDateString('es-ES' , options);

    }


    return (
        <SafeAreaView
            style={ styles.contenedor }
        >
            <Text style={styles.titulo}>Informacion {''}
                <Text style={styles.tituloBold}>Paciente</Text>
            </Text>

            <View>
                <Pressable 
                    onLongPress={ () => {
                            setModalPaciente(false)
                            setPacienteEditar({})
                        } }
                    style={styles.btnCerrar}
                    >
                    <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
                </Pressable>
            </View>
            
            <View style={styles.contenido }>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{ paciente.paciente }</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label} >Propietario:</Text>
                    <Text style={styles.valor}>{ paciente.propietario }</Text>
                </View> 

                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{ paciente.email }</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Telefono:</Text>
                    <Text style={styles.valor}>{ paciente.telefono }</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta:</Text>
                    <Text style={styles.valor}>{ formatearFecha(paciente.fecha) }</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Sintomas:</Text>
                    <Text style={styles.valor}>{ paciente.sintomas }</Text>
                </View>

            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#f59e0b',
        flex: 1
    },
    titulo : {
      textAlign: 'center',
      fontSize: 30,
      color: '#fff',
      fontWeight: '600',
    },
    tituloBold : {
      fontWeight: '900',
      color: '#fff'
  
    },
    btnCerrar: {
        marginVertical:30,
        backgroundColor: '#e06900',
        marginHorizontal: 30,
        padding:15,
        borderRadius:10
    },
    btnCerrarTexto: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'
    
    },
    contenido: {
        borderRadius:10,
        padding: 20,
        backgroundColor: '#fff',
        marginHorizontal:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },campo: {
        marginBottom: 10
    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize:12
    },
    valor: {
        fontWeight: '700',
        fontSize: 20,
        color: '#334155'
    }


    
})

export default InformacionPaciente
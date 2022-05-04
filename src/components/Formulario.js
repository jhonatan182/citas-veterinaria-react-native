import React, {useState , useEffect} from 'react'
import {Text , Modal , SafeAreaView , StyleSheet , TextInput, View , ScrollView , Pressable , Alert} from 'react-native'
import DatePicker from 'react-native-date-picker';

function Formulario ({cerrarModal,modal, setPacientes , pacientes , pacienteEditar ,setPacienteEditar}) {

    const [paciente , setPaciente] = useState('');
    const [propietario , setPropietario] = useState('');
    const [email , setEmail] = useState('');
    const [telefono , setTelefono] = useState('');
    const [fecha , setFecha] = useState(new Date())
    const [sintomas , setSintomas] = useState('');

    useEffect(() => {

        if(Object.keys(pacienteEditar).length > 0) {

            setPaciente(pacienteEditar.paciente);
            setPropietario(pacienteEditar.propietario);
            setEmail(pacienteEditar.email);
            setFecha(pacienteEditar.fecha);
            setTelefono(pacienteEditar.telefono);
            setSintomas(pacienteEditar.sintomas);
        }

    },[pacienteEditar])

    const handleNuevaCita = () =>  {
        if([paciente ,propietario, email, telefono ,fecha , sintomas].includes('')) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        const nuevoPacientes = {
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        };

        if(pacienteEditar.id) {
            nuevoPacientes.id = pacienteEditar.id;

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === nuevoPacientes.id ? nuevoPacientes : pacienteState);

            setPacientes(pacientesActualizados);
            setPacienteEditar({});

        } else {
            nuevoPacientes.id = Date.now();
            setPacientes([...pacientes , nuevoPacientes])
        }


        
        cerrarModal()

        /* limpiar el formulario */
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');

    }

    return (
        <Modal
            animationType='slide'
            visible={modal}
        >

            <SafeAreaView style={styles.contenido}>
                <ScrollView>
                    <Text style={styles.titulo}> {pacienteEditar.id ? 'Editando:' : 'Nueva'} {''}
                        <Text style={styles.tituloBold}>{pacienteEditar.id ? pacienteEditar.paciente : 'Cita'} </Text>    
                    </Text>   

                    <Pressable 
                        style={styles.btnCancelar} 
                        onPress={() =>{ 
                            cerrarModal()
                            setPacienteEditar({})
                            setPaciente('')
                            setPropietario('')
                            setEmail('')
                            setTelefono('')
                            setFecha(new Date())
                            setSintomas('')

                            }
                        }
                        >
                        <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                    </Pressable>

                    <View style={styles.campo}>
                        <Text style={styles.label} >Nombre Paciente:</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder='Nombre paciente'
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>     

                    <View style={styles.campo}>
                        <Text style={styles.label} >Nombre Propietario:</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder='Nombre Propietario'
                            placeholderTextColor={'#666'}
                            value={propietario}
                            onChangeText={setPropietario}
                        />
                    </View>  

                    <View style={styles.campo}>
                        <Text style={styles.label} >Email Propietario:</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder='Email Propietario'
                            placeholderTextColor={'#666'}
                            keyboardType= 'email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>  

                    <View style={styles.campo}>
                        <Text style={styles.label} >Telefono Propietario:</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder='Telefono Propietario'
                            placeholderTextColor={'#666'}
                            keyboardType='number-pad'
                            value={telefono}
                            onChangeText={setTelefono}
                            maxLength={8}
                        />
                    </View> 

                    <View style={styles.campo}>
                        <Text style={styles.label} >Fecha Alta:</Text>

                        <View style={styles.contenedorFecha}>
                            <DatePicker 
                                date={fecha}
                                locale='es'
                                onDateChange={date => setFecha(date)}
                                minimumDate={new Date() }
                                mode='datetime'
                            />
                        </View>

                    </View>

                    <View style={[styles.campo , styles.sintomasInput]}>
                        <Text style={styles.label} >Sintomas:</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder='Sintomas Paciente'
                            placeholderTextColor={'#666'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View> 
                    
                    <Pressable 
                        onPress={ handleNuevaCita }
                        style={styles.btnNuevaCita} >
                        <Text style={styles.btnNuevaCitaTexto}>{ pacienteEditar.id ? 'Editar Paciente' :  'Agregar Paciente'}</Text>
                    </Pressable>
                    
                </ScrollView>
            </SafeAreaView>


      </Modal>
    )
}

const styles = StyleSheet.create({
    contenido : {
        backgroundColor: '#6d28d9',
        flex: 1
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#fff'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical:30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding:15,
        borderRadius:10
    },
    btnCancelarTexto: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'
    
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#fff',
        marginBottom: 10,
        marginTop:15,
        fontWeight: '600',
        fontSize: 20
    },
    input: {
        backgroundColor: '#fff',
        padding:15,
        borderRadius: 10,
    },
    sintomasInput : {
        height:200

    },contenedorFecha: {
        backgroundColor: '#fff',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 15,
        backgroundColor: '#f59e0b',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10,
    },
    btnNuevaCitaTexto: {
        textAlign: 'center',
        color: '#5827A4',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
})

export default Formulario;
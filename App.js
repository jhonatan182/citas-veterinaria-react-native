import React,{useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert
} from 'react-native';

import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {

  const [modal , setModal] = useState(false);
  const [pacientes , setPacientes] = useState([]);
  const [pacienteEditar , setPacienteEditar] = useState({});
  const [modalPaciente , setModalPaciente] = useState(false);

  const editarPaciente = paciente => {
    // console.log(paciente);
    setPacienteEditar(paciente);
    setModal(true);

  }

  const eliminarPaciente = ({id}) => {

    Alert.alert('¿Desear eliminar este paciente?', 'Un paciente no se puede eliminar', 
    [
      {text : 'Cancelar'},
      {text: 'Si, Eliminar' , onPress: () => {
        const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );

        setPacientes(pacientesActualizados);
      }}
    ]
    );
  
  }


  const cerrarModal = () => {
    setModal(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo} >Administrador de citas {''}
        <Text style={styles.tituloBold} >Veterinaria</Text>
      </Text>

      <Pressable
        onPress={ () => setModal(true) }
        style={ styles.btnNuevaCita }
      >
        <Text
          style={ styles.btnTextoNuevaCita }
        >Nueva Cita</Text>
      </Pressable>


      {pacientes.length === 0 ? <Text style={styles.noPacientes}>No hay pacientes aun</Text> : <FlatList
        style={styles.listado}
        data={pacientes} // los datos sobre el cual vamos a iterar
        keyExtractor={(item) => item.id} // un campo o o llave que no se repitra por cada registro
        renderItem={ ({item}) =>(  // componente que va ir renderizando con los dato
          <Paciente 
            item={item}
            editarPaciente={editarPaciente}
            eliminarPaciente={eliminarPaciente}
            setModalPaciente={setModalPaciente}
            setPacienteEditar={setPacienteEditar}
            
          />
        )}
      /> }

      {modal && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          pacienteEditar={pacienteEditar}
          setPacienteEditar={setPacienteEditar}
        />
      )}


      
      <Modal 
        visible={ modalPaciente }
        animationType = 'slide'
      >
        <InformacionPaciente 
          paciente={pacienteEditar}
          setModalPaciente={setModalPaciente}
          setPacienteEditar={setPacienteEditar}
        />
      </Modal>

    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo : {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold : {
    fontWeight: '900',
    color: '#6d28d9'

  },
  btnNuevaCita : {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10

  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})


export default App;

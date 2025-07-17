import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { isTitleUnique } from '../../helpers/isTitleUnique';
import { formStyle } from '../../styles/formStyle';

export default function FormComponent({ onNotesClick, data }) {
  const URL = process.env.EXPO_PUBLIC_API_URL;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    title: '',
    message: '',
    success: false
  });

  const handleSubmit = async () => {
    if (isTitleUnique(title, data)) {
      setAlert({
        show: true,
        title: 'Título duplicado',
        message: `Ya existe una nota con el título "${title}". Por favor, elige otro título.`,
        success: false
      });
      return;
    }
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=add&Titulo=${title}&Contenido=${content}`,
      });
      if (!response.ok) throw new Error('Error al enviar la nota');
      setAlert({
        show: true,
        title: 'Nota agregada',
        message: `Nota "${title}" agregada correctamente.`,
        success: true
      });
      setTitle('');
      setContent('');
      onNotesClick && onNotesClick();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Oops...',
        message: 'Error al enviar nota.',
        success: false
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={formStyle.cardContainer}
    >
      <Text style={formStyle.title}>Agregar Nota</Text>
      <View style={formStyle.form}>
        <Text style={formStyle.label}>Título Nota</Text>
        <TextInput
          placeholder="Título de la nota"
          style={formStyle.input_field}
          value={title}
          onChangeText={setTitle}
          minLength={3}
          maxLength={50}
          required
        />
        <Text style={formStyle.label}>Contenido</Text>
        <TextInput
          placeholder="Contenido de la nota"
          style={[formStyle.input_field, {height: 90, textAlignVertical: 'top'}]}
          value={content}
          onChangeText={setContent}
          minLength={3}
          maxLength={500}
          required
          multiline
        />
        <TouchableOpacity style={formStyle.button} onPress={handleSubmit}>
          <Text style={formStyle.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Alerta */}
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        title={alert.title}
        message={alert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={alert.success ? "#4CAF50" : "#DD6B55"}
        onConfirmPressed={() => setAlert({ ...alert, show: false })}
      />
    </KeyboardAvoidingView>
  );
}

// const formStyle = StyleSheet.create({
//   cardContainer: {
//     width: 370,
//     alignSelf: 'center',
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginVertical: 10,
//     padding: 16,
//     marginBottom: 50
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: '#f3f3f3',
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 10,
//     color: '#222',
//   },
//   form: {
//     marginTop: 10,
//   },
//   label: {
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   input_field: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginTop: 4,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#222',
//     borderRadius: 10,
//     paddingVertical: 16,
//     marginTop: 20,
//     alignItems: 'center',
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     letterSpacing: 1,
//     fontSize: 16,
//     textTransform: 'uppercase',
//   }
// });

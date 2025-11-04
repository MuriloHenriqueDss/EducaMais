import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../SupabaseConfig';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleCadastro() {
    if (!nome.trim()) return Alert.alert('Informe seu nome');
    if (!email.trim()) return Alert.alert('Informe seu e-mail');
    if (!senha || senha.length < 6) return Alert.alert('A senha deve ter pelo menos 6 caracteres');

    // Cria a conta no Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password: senha });

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    // Se o usuário foi criado imediatamente (sem confirmar por e-mail), insere dados adicionais
    const userId = data?.user?.id;

    if (userId) {
      const { error: insertError } = await supabase.from('professores').insert([{ id: userId, nome: nome.trim(), email: email.trim() }]);
      if (insertError) {
        Alert.alert('Erro', insertError.message);
        return;
      }
      Alert.alert('Sucesso', 'Cadastro realizado! Você já pode entrar.');
      navigation.replace('Login');
    } else {
      // Caso seja necessário confirmar por e-mail, apenas avise o usuário
      Alert.alert('Verifique seu e-mail', 'Um link de confirmação foi enviado. Confirme para ativar sua conta.');
      navigation.replace('Login');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Professor</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 22, color: '#fff', marginBottom: 20 },
  input: { width: '80%', backgroundColor: '#222', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 10 },
  button: { backgroundColor: '#4a90e2', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

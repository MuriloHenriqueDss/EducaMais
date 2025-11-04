import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase";

export default function CadastrarTurma({ navigation }) {
  const [nome, setNome] = useState("");

  async function cadastrar() {
    if (!nome.trim()) return Alert.alert("Informe o nome da turma");
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from("turmas").insert([{ nome: nome.trim(), professor_id: userData.user.id }]);
    if (error) Alert.alert("Erro", error.message);
    else {
      Alert.alert("Sucesso", "Turma cadastrada!");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome da Turma" value={nome} onChangeText={setNome} style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={cadastrar}>
        <Text style={{ color: "#fff" }}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { backgroundColor: "#f0f0f0", padding: 12, borderRadius: 8, marginBottom: 12 },
  btn: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center" },
});

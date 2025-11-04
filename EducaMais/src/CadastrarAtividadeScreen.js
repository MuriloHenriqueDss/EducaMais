import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { supabase } from "../SupabaseConfig";

export default function CadastrarAtividade({ route, navigation }) {
  const { turmaId } = route.params;
  const [descricao, setDescricao] = useState("");

  async function cadastrar() {
    if (!descricao.trim()) return Alert.alert("Informe a descrição da atividade");
    const { error } = await supabase.from("atividades").insert([{ descricao, turma_id: turmaId }]);
    if (error) Alert.alert("Erro", error.message);
    else {
      Alert.alert("Sucesso", "Atividade cadastrada!");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Descrição da Atividade" value={descricao} onChangeText={setDescricao} style={styles.input} />
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

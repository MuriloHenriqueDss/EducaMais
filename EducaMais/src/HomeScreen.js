import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase";

export default function PrincipalProfessor({ navigation }) {
  const [turmas, setTurmas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      navigation.replace("Login");
      return;
    }
    setUsuario(data.user);
    buscarTurmas(data.user.id);
  }

  async function buscarTurmas(profId) {
    const { data, error } = await supabase
      .from("turmas")
      .select("*")
      .eq("professor_id", profId)
      .order("created_at", { ascending: false });
    if (!error) setTurmas(data);
  }

  async function sair() {
    await supabase.auth.signOut();
    navigation.replace("Login");
  }

  async function excluirTurma(id) {
    // Verificar se há atividades vinculadas
    const { data: atividades } = await supabase.from("atividades").select("id").eq("turma_id", id);
    if (atividades.length > 0) {
      Alert.alert("Aviso", "Você não pode excluir uma turma com atividades cadastradas.");
      return;
    }

    Alert.alert("Excluir Turma", "Deseja realmente excluir esta turma?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.from("turmas").delete().eq("id", id);
          if (error) Alert.alert("Erro", error.message);
          else buscarTurmas(usuario.id);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.prof}>Professor(a): {usuario?.email}</Text>
        <TouchableOpacity style={styles.logout} onPress={sair}>
          <Text style={{ color: "#fff" }}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("CadastrarTurma")}>
        <Text style={{ color: "#fff" }}>+ Nova Turma</Text>
      </TouchableOpacity>

      <FlatList
        data={turmas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhuma turma cadastrada.</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{index + 1} - {item.nome}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.verBtn}
                onPress={() => navigation.navigate("AtividadesTurma", { turma: item })}
              >
                <Text style={{ color: "#fff" }}>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.delBtn} onPress={() => excluirTurma(item.id)}>
                <Text style={{ color: "#fff" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  prof: { fontWeight: "600" },
  logout: { backgroundColor: "#d9534f", padding: 8, borderRadius: 6 },
  addBtn: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  card: { backgroundColor: "#f8f9fa", padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: "row", justifyContent: "space-between" },
  nome: { fontWeight: "600" },
  verBtn: { backgroundColor: "#007bff", padding: 8, borderRadius: 6, marginRight: 8 },
  delBtn: { backgroundColor: "#dc3545", padding: 8, borderRadius: 6 },
});

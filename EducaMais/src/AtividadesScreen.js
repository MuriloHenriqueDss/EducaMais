import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../SupabaseConfig";

export default function AtividadesTurma({ route, navigation }) {
  const { turma } = route.params;
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    buscarAtividades();
  }, []);

  async function buscarAtividades() {
    const { data } = await supabase
      .from("atividades")
      .select("*")
      .eq("turma_id", turma.id)
      .order("created_at", { ascending: false });
    setAtividades(data || []);
  }

  async function excluirAtividade(id) {
    Alert.alert("Excluir", "Deseja excluir esta atividade?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await supabase.from("atividades").delete().eq("id", id);
          buscarAtividades();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Turma: {turma.nome}</Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("CadastrarAtividade", { turmaId: turma.id })}
      >
        <Text style={{ color: "#fff" }}>+ Nova Atividade</Text>
      </TouchableOpacity>

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhuma atividade cadastrada</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text>{index + 1} - {item.descricao}</Text>
            <TouchableOpacity style={styles.delBtn} onPress={() => excluirAtividade(item.id)}>
              <Text style={{ color: "#fff" }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  titulo: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  addBtn: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  card: { backgroundColor: "#f8f9fa", padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: "row", justifyContent: "space-between" },
  delBtn: { backgroundColor: "#dc3545", padding: 8, borderRadius: 6 },
});

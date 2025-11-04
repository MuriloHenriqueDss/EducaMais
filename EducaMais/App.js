import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Login from "./src/LoginScreen";
import PrincipalProfessor from "./src/HomeScreen";
import CadastrarTurma from "./src/CadastrarTurmaScreen";
import AtividadesTurma from "./src/ClassesScreen";
import CadastrarAtividade from "./src/CadastrarAtividadeScreen";
import AtividadesScreen from "./src/AtividadesScreen";
import ClassesScreen from "./src/ClassesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ======= TABS PRINCIPAIS DO PROFESSOR =======
function TabsProfessor() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#111" },
        tabBarActiveTintColor: "#4a90e2",
      }}
    >
      <Tab.Screen
        name="PrincipalProfessor"
        component={PrincipalProfessor}
        options={{
          title: "Turmas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CadastrarTurma"
        component={CadastrarTurma}
        options={{
          title: "Nova Turma",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ======= NAVEGAÇÃO PRINCIPAL =======
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Autenticação" }}
        />

        {/* Ao logar, abre as abas principais */}
        <Stack.Screen
          name="TabsProfessor"
          component={TabsProfessor}
          options={{ headerShown: false }}
        />

        {/* Telas adicionais */}
        <Stack.Screen
          name="AtividadesTurma"
          component={AtividadesTurma}
          options={{ title: "Atividades da Turma" }}
        />
        <Stack.Screen
          name="CadastrarAtividade"
          component={CadastrarAtividade}
          options={{ title: "Cadastrar Atividade" }}
        />
        <Stack.Screen
          name="AtividadesScreen"
          component={AtividadesScreen}
          options={{ title: "Atividades da Turma" }}
        />
        <Stack.Screen
          name="ClassesScreen"
          component={ClassesScreen}
          options={{ title: "Atividades da Turma" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

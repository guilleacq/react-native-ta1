import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(0);

  // esto actualiza el contador automáticamente cuando cambian las tareas
  useEffect(() => {
    setCounter(tasks.length);
  }, [tasks]);

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Añadir nueva tarea"
        onChangeText={(text) => setTask(text)}
        value={task}
      />
      <Button
        title="Añadir"
        onPress={() => {
          if (task.trim()) {
            setTasks([...tasks, { id: Date.now().toString(), text: task }]);
            setTask('');
          }
        }}
      />

      {/* Contador de tareas */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterLabel}>Tareas pendientes:</Text>
        <Text style={styles.counterText}>{counter}</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
  },
  deleteText: {
    color: 'red',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  counterLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

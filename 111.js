import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList, TouchableHighlight, useWindowDimensions } from 'react-native';

const App = () => {
    const window = useWindowDimensions();
    const [tasks, setTasks] = useState([]);
    const [predefinedTasks] = useState(['Депассивация', 'Монтаж датчика давления', 'Монтаж ДОЛ', 'Установка RT', 'Протяжка кабелей', 'Сборка ЗТС', 'Программирование ЗТС', 'Установка поппита', 'Почта ГТИ', 'Почта мастера', 'Почта химиков', 'Документация к началу работ', 'Проверка НУБТ', 'Подбор мюлшу']);
    const [newTask, setNewTask] = useState('');
    const [showPredefinedTasks, setShowPredefinedTasks] = useState(false);
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editedTask, setEditedTask] = useState('');

    const addTask = () => {
        const updatedTasks = [...tasks];
        if (editingTaskIndex !== null) {
            updatedTasks[editingTaskIndex] = editedTask;
        } else {
            if (newTask !== '') {
                updatedTasks.unshift(newTask);
            }
        }
        setTasks(updatedTasks);
        setEditingTaskIndex(null);
        setEditedTask('');
        setNewTask('');
    };

    const startEditingTask = (index) => {
        setEditingTaskIndex(index);
        setEditedTask(tasks[index]);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const addPredefinedTask = (predefinedTask) => {
        setTasks([predefinedTask, ...tasks]);
    };

    const handleButtonPress = (callback) => {
        return () => {
            callback();
        };
    };

    return (
      <View style={[styles.container, { width: window.width, height: window.height, backgroundColor: '#1a1a1a' }]}>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>MWD TASKS</Text> {/* Центрированный заголовок */}
          <FlatList
              data={tasks}
              renderItem={({ item, index }) => (
                  <View style={styles.taskTile}>
                      <View style={styles.taskContent}>
                          {editingTaskIndex === index ? (
                              <TextInput
                                  style={styles.editInput}
                                  value={editedTask}
                                  onChangeText={text => setEditedTask(text)}
                              />
                          ) : (
                              <Text style={{ color: '#FFFFFF' }}>{item}</Text>
                          )}
                      </View>
                      <View style={styles.editButtonContainer}>
                          <TouchableHighlight
                              style={styles.buttonTouch}
                              underlayColor="#666666"
                              onPress={handleButtonPress(editingTaskIndex === index ? addTask : () => startEditingTask(index))}
                          >
                              <Text style={styles.buttonText}>{editingTaskIndex === index ? '✔' : '∴'}</Text>
                          </TouchableHighlight>
                          <TouchableHighlight
                              style={styles.buttonTouch}
                              underlayColor="#666666"
                              onPress={handleButtonPress(() => deleteTask(index))}
                          >
                              <Text style={styles.buttonText}>✖</Text>
                          </TouchableHighlight>
                      </View>
                  </View>
              )}
              keyExtractor={(item, index) => index.toString()}
          />
            <TextInput
                placeholder="Ввод своей задачи"
                style={styles.input}
                value={editingTaskIndex !== null ? editedTask : newTask}
                onChangeText={text => editingTaskIndex !== null ? setEditedTask(text) : setNewTask(text)}
            />
            <Button title={editingTaskIndex !== null ? '✔' : 'Добавить задачу'} onPress={addTask} style={styles.button} />

            <View style={{ marginBottom: 20 }} />

            <Button title="Показать заранее прописанные задачи" onPress={() => setShowPredefinedTasks(true)} style={[styles.button, styles.showPredefinedTasksButton]} />

            <Modal visible={showPredefinedTasks} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.predefinedTasksContainer}>
                    {predefinedTasks.map((task, index) => (
                        <Button key={task} title={task} onPress={() => addPredefinedTask(task)} style={[styles.button, styles.predefinedTaskButton]} />
                    ))}
                    </View>
                    <Button title="Назад" onPress={() => setShowPredefinedTasks(false)} style={styles.button} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        color: '#FFFFFF',
    },
    editInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        color: '#FFFFFF',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  button: {
      marginVertical: 10,
      color: '#FFFFFF',
  },
  showPredefinedTasksButton: {
      marginBottom: 20,
      color: '#FFFFFF',
  },
  predefinedTasksContainer: {
      backgroundColor: '#212121',
      borderRadius: 10,
      padding: 20,
      width: '80%',
  },
  predefinedTaskButton: {
      marginBottom: 10, // Увеличиваем расстояние между задачами на 15
      backgroundColor: '#424242',
      padding: 10,
      borderRadius: 5,
  },
  taskTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Выравниваем элементы по краям
    backgroundColor: '#424242',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
},
editButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
separator: {
    flex: 1,
},
separatorSmall: {
    width: 10, // Небольшое расстояние между кнопками
},
taskContent: {
    flex: 1,
},
title: {
  textAlign: 'center', // Центрирование текста
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#FFFFFF',
},
buttonTouch: {
    backgroundColor: '#333333',
    padding: 10,
    margin: 5,
    borderRadius: 5,
},
buttonText: {
    color: '#FFFFFF',
},
});

export default App;


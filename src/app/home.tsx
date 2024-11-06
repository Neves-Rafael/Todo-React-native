import "react-native-get-random-values";
import { View, Image, TextInput, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { CirclePlus, ClipboardList, Circle, CircleCheckBig, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { v4 as randomUUID } from "uuid";

interface TaskProps {
  id: string;
  title: string;
  status: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [completedTask, setCompletedTask] = useState(0);

  function handleCreateTask(task: string) {
    if (task.length <= 3) {
      return Alert.alert("Nova Task", "O texto para adicionar a nova task está muito curto.");
    }

    const taskContent = {
      id: randomUUID(),
      title: task,
      status: false,
    };

    setTasks((prevState) => [...prevState, taskContent]);

    setTaskInput("");

    return;
  }

  function handleRemoveTask(taskId: string) {
    const removeCheckedTask = tasks.filter((task) => task.id === taskId);

    if (removeCheckedTask[0].status === true) {
      setCompletedTask((prevState) => prevState - 1);
    }

    return setTasks((prevState) => prevState.filter((task) => task.id !== taskId));
  }

  function handleStatus(taskId: string) {
    const searchTask = tasks.filter((task) => task.id === taskId);

    if (searchTask[0].status === false) {
      setTasks((prevState) =>
        prevState.map((task) => (task.id === taskId ? { ...task, status: true } : task))
      );

      return setCompletedTask((prevState) => prevState + 1);
    }

    if (searchTask[0].status === true) {
      setTasks((prevState) =>
        prevState.map((task) => (task.id === taskId ? { ...task, status: false } : task))
      );
      return setCompletedTask((prevState) => prevState - 1);
    }

    return;
  }

  return (
    <View className="items-center bg-zinc-950">
      <Image className="my-24 w-52 h-14" source={require("../assets/logo.png")} />
      <View className="bg-zinc-800 flex-1 w-screen px-8">
        <View className="flex-row mt-[-28] gap-2">
          <TextInput
            className="h-16 rounded-md px-4 bg-zinc-600 flex-1 text-[16px] text-zinc-50 border-zinc-600 border-2 placeholder:text-zinc-400 focus:border-cyan-400"
            placeholder="Adicione uma nova Tarefa"
            onChangeText={setTaskInput}
            value={taskInput}
          />
          <TouchableOpacity
            onPress={() => handleCreateTask(taskInput)}
            className="h-16 w-16 flex items-center justify-center bg-cyan-600 rounded-md"
          >
            <Text>
              <CirclePlus size={24} color={"#fafafa"} />
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between my-6 ">
          <View className="flex-row gap-2 h-full items-center">
            <Text className="text-cyan-400 text-lg">Criadas</Text>
            <Text className="text-zinc-50 bg-zinc-500 font-bold px-3 py-1 rounded-xl">
              {tasks.length}
            </Text>
          </View>
          <View className="flex-row gap-2 h-full items-center">
            <Text className="text-purple-400 text-lg">Concluídas</Text>
            <Text className="text-zinc-50 bg-zinc-500 font-bold px-3 py-1 rounded-xl">
              {completedTask}
            </Text>
          </View>
        </View>
        <View className="h-[1px] bg-zinc-500 mb-4" />

        {tasks.length < 1 ? (
          <View className="items-center mt-28 gap-8">
            <ClipboardList className="bg-green-500 text-purple-600" size={100} color={"#828181"} />

            <View>
              <Text className="font-bold text-zinc-400">
                Você ainda não tem tarefas cadastradas
              </Text>
              <Text className=" text-zinc-400">Crie tarefas e organize seus items a fazer</Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <>
                {item.status === false ? (
                  <View className="flex-row justify-between items-center gap-4 p-4 bg-zinc-600 rounded-xl mb-4">
                    <Circle
                      onPress={() => handleStatus(item.id)}
                      className="bg-green-500 text-purple-600"
                      size={30}
                      color={"#00c8ff"}
                    />

                    <Text className="text-zinc-50 flex-1">{item.title}</Text>

                    <Trash2
                      onPress={() => handleRemoveTask(item.id)}
                      className="bg-green-500 text-purple-600"
                      size={24}
                      color={"#ff4a4a"}
                    />
                  </View>
                ) : (
                  <View className="flex-row justify-between items-center gap-4 p-4 bg-zinc-600 rounded-xl mb-4">
                    <CircleCheckBig
                      onPress={() => handleStatus(item.id)}
                      className="bg-green-500 text-purple-600"
                      size={30}
                      color={"#ffffff"}
                      fill={"#109739"}
                    />

                    <Text className="text-zinc-400 flex-1 line-through">{item.title}</Text>

                    <Trash2
                      className="bg-green-500 text-purple-600"
                      size={24}
                      color={"#ff4a4a"}
                      onPress={() => handleRemoveTask(item.id)}
                    />
                  </View>
                )}
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}

import { Pressable, Text } from "react-native";

export default function PressableInput({ btn, setbtn, text }) {
  return (
    <Pressable style={{ width: 20, height: 20, borderRadius: 100, borderColor: { btn } ? "#ccc" : "#293461" }}
      onPress={() => {
        { setbtn } (prev => !prev)
      }} ><Text> {text} </Text></Pressable>
  )
}

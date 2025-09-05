import { Pressable } from "react-native";

export default function PressableInput({ btn, setbtn, text }) {
  return (
    <Pressable style={{ width: 20, height: 20, borderRadius: 150, borderColor: { btn } ? "#ccc" : "#293461" }}
      onPress={() => {
        { setbtn } (prev => !prev)
      }} >{text}</Pressable>
  )
}

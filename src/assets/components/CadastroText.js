import { Text } from "react-native"

// IMPORTAÇÃO STYLES
import { styles } from "../styles/styles"

export default function CadastroText({ txt }) {
  return (
    <Text style={styles.escrita}>{txt}</Text>
  )
}

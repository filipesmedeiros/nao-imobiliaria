export interface Props {
  onRegisterPhoneNumber: () => void
}

export const UnkownPhoneNumber = ({ onRegisterPhoneNumber }: Props) => {
  return (
    <div>
      <h2>Este número ainda não está registado, queres registá-lo?</h2>
      <button onClick={onRegisterPhoneNumber}>Registar</button>
    </div>
  )
}

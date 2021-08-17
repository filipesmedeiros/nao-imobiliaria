import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FunkyButton } from './FunkyButton'

export interface Props {}

const PHONE_NUMBER_PATTERN = '(9(1|2|3|6)|2[0-9])[0-9]{7}'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;
`

const FormControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;

  label {
    font-size: 2.5rem;
  }

  input {
    font-size: 5rem;
    color: #311338;
    text-align: center;

    width: calc(9ch + 2rem + 3rem);
    padding: 1.5rem;

    border: 5px solid;
    border-color: #d888ec;
    border-radius: 5px;

    transition: border-color 0.2s ease;

    :active,
    :focus {
      outline: none;
      border-color: #88d0ec;
    }

    ::placeholder {
      font-size: 2rem;
    }
  }
`

export const CheckPhoneNumberForm = ({}: Props) => {
  const { push } = useRouter()

  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <FormWrapper
      onSubmit={e => {
        e.preventDefault()
        push({ pathname: '/[phoneNumber]', query: { phoneNumber } })
      }}
    >
      <FormControlGroup>
        <label htmlFor="phone-number">Número de telefone/telemóvel</label>
        <input
          placeholder="Ligou-me outra vez... 😪"
          type="tel"
          name="phone-number"
          id="phone-number"
          pattern={PHONE_NUMBER_PATTERN}
          required
          onInvalid={({ target }) =>
            (target as HTMLInputElement).setCustomValidity(
              'Por favor preencha o número corretamente'
            )
          }
          onChange={({ target }) => setPhoneNumber(target.value)}
        />
      </FormControlGroup>

      <FunkyButton type="submit">VERIFICAR</FunkyButton>
    </FormWrapper>
  )
}

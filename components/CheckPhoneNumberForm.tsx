import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { gradientKeyframes } from '@styles/keyframes'
import { useReducedMotion } from '@lib/hooks/useReducedMotion'
import { FunkyButton } from '@components/FunkyButton'
import { useRandomColor } from '@lib/hooks/useRandomColor'
import { gradientWithLoop } from '@styles/theme'

export interface Props {}

const PHONE_NUMBER_PATTERN = '(9(1|2|3|6)|2[0-9])[0-9]{7}'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;

  @media (prefers-reduced-motion: reduce) and (max-width: 768px) {
    :focus-within,
    :active {
      input[type='submit'] {
        background-color: #88d0ec;
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) and (max-width: 768px) {
    :focus-within,
    :active {
      input[type='submit'] {
        animation: ${gradientKeyframes} 30s linear infinite;
        background-image: linear-gradient(to right, ${gradientWithLoop});
        background-size: 1000% 100%;
      }
    }
  }
`

const FormControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1.5rem;

  label {
    font-size: 2.5rem;
  }

  input {
    font-size: 5rem;
    color: #311338;
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.4rem;

    width: calc(9ch + 4rem + 3rem);
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
      letter-spacing: normal;
    }
  }
`

export const CheckPhoneNumberForm = ({}: Props) => {
  const { push } = useRouter()

  const [phoneNumber, setPhoneNumber] = useState('')

  const reducedMotion = useReducedMotion()
  console.log(reducedMotion)

  const { color: phoneNumberColor, changeColor: changePhoneNumberColor } =
    useRandomColor()

  return (
    <FormWrapper
      onSubmit={e => {
        e.preventDefault()
        push({ pathname: '/[phoneNumber]', query: { phoneNumber } })
      }}
      onKeyPress={({ key, currentTarget }) => {
        if (key === 'Enter') currentTarget.requestSubmit()
      }}
    >
      <FormControlGroup>
        <label htmlFor="phone-number">Número de telefone/telemóvel</label>
        <input
          maxLength={9}
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
          value={phoneNumber}
          onKeyPress={e => {
            if (Object.is(Number(e.key), NaN)) e.preventDefault()
          }}
          onChange={({ target }) => {
            if (!reducedMotion) changePhoneNumberColor()
            setPhoneNumber(target.value)
          }}
          style={{ color: phoneNumberColor }}
        />
      </FormControlGroup>

      <FunkyButton type="submit">VERIFICAR</FunkyButton>
    </FormWrapper>
  )
}

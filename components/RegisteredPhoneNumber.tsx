import styled from '@emotion/styled'

import { FunkyButton } from '@components/FunkyButton'
import { ArrowUp } from '@components/svg/ArrowUp'
import { ArrowDown } from './svg/ArrowDown'

export interface Props {
  upvotes?: number
  downvotes?: number
  userVote: {
    loading: boolean
    vote: boolean | null | undefined
  }
  onUpvote: () => void
  onDownvote: () => void
}

const TitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 3rem;
`

const VotesWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 3rem;
`

const YesOrNo = styled.h2`
  font-size: 4.5rem;
  font-weight: 900;
  letter-spacing: 0.3rem;

  margin: 0;
`

const Subtitle = styled.h3`
  font-size: 1.5rem;

  margin: 0;
`

const VoteButton = styled(FunkyButton)`
  padding: 0.8rem;
`

export const RegisteredPhoneNumber = ({
  upvotes = 0,
  downvotes = 0,
  userVote: { loading, vote },
  onUpvote,
  onDownvote,
}: Props) => {
  const isAgent = upvotes > downvotes
  return (
    <Wrapper>
      <TitlesWrapper>
        <YesOrNo>{isAgent ? 'SIM' : 'NÃO'}</YesOrNo>
        <Subtitle>
          Este número {!isAgent ? 'não ' : ''}pertence a um/a agente imobiliári@
        </Subtitle>
      </TitlesWrapper>

      <VotesWrapper>
        <div>
          <div>{upvotes}</div>
          <VoteButton
            onClick={onUpvote}
            disabled={loading || vote === true}
            direction="top"
          >
            <ArrowUp size="4rem" />
          </VoteButton>
        </div>
        <div>
          <div>{downvotes}</div>
          <VoteButton
            onClick={onDownvote}
            disabled={loading || vote === false}
            direction="bottom"
          >
            <ArrowDown size="4rem" />
          </VoteButton>
        </div>
      </VotesWrapper>
    </Wrapper>
  )
}

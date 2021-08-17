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

export const RegisteredPhoneNumber = ({
  upvotes = 0,
  downvotes = 0,
  userVote: { loading, vote },
  onUpvote,
  onDownvote,
}: Props) => {
  const isAgent = upvotes > downvotes
  return (
    <div>
      <div>
        <h2>{isAgent ? 'SIM' : 'NÃO'}</h2>
        <h3>
          Este número {!isAgent ? 'não ' : ''}pertence a um/a agente imobiliári@
        </h3>
      </div>

      <div>
        <div>{upvotes}</div>
        <button onClick={onUpvote} disabled={loading || vote === true}>
          Upvote
        </button>
      </div>
      <div>
        <div>{downvotes}</div>
        <button onClick={onDownvote} disabled={loading || vote === false}>
          Downvote
        </button>
      </div>
    </div>
  )
}

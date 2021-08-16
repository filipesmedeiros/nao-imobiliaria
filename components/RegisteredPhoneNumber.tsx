export interface Props {
  upvotes?: number
  downvotes?: number
  userVote: {
    loading: boolean
    vote: boolean | undefined
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
      {isAgent ? (
        <div>
          <h2>SIM</h2>
          <h3>Este número pertence a um/a agente imobiliári@</h3>
        </div>
      ) : (
        <div>
          <h2>NÃO</h2>
          <h3>Este número não pertence a um/a agente imobiliári@</h3>
        </div>
      )}
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

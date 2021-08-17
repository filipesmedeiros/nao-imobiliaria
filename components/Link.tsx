import NextLink, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import styled from '@emotion/styled'

export interface Props extends LinkProps {
  children: ReactNode
  className?: string
}

export const Link = ({ children, className = '', ...linkProps }: Props) => (
  <NextLink {...linkProps}>
    <a className={className}>{children}</a>
  </NextLink>
)

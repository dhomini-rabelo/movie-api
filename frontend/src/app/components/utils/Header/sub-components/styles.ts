import styled from 'styled-components'

export const Div = {
  Link: styled.div`
    border-color: transparent;

    .active > & {
      border-color: var(--Gray-500);
    }
  `,
}

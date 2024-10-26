import styled from 'styled-components'

export const Select = {
  Box: styled.select`
    display: flex;
    width: 100%;
    padding: 0.75rem 1rem;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.25rem;
    background: var(--Black-100);
    color: var(--Gray-500);

    option {
      border: none;
      width: 100%;
      background-color: transparent;
      color: var(--Gray-500);
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 170.3%;

      &::placeholder {
        font-weight: 300;
        color: var(--Gray-700);
      }

      &:focus {
        outline: transparent;
        box-shadow: none;
      }
    }

    option:focus {
      outline: none;
    }
  `,
}

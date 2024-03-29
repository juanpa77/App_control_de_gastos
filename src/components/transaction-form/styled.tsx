import styled from "styled-components";

type Props = {
  isOpenModal: boolean
}

export const Wrapper = styled('form')`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${(props: Props) => props.isOpenModal && 'filter: blur(1px)'}
`
export const Input = styled('input')`
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.75);
  color: #ffff;
  height: 56px;
  text-align: center;
  color-scheme: dark;
  font-family: "Avenir";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 56px;
`

export const TextArea = styled(Input)`
  font-family: "DM Sans";
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  height: 89px;
  border: 1px solid #ffffff;
  ::placeholder {
    font-family: "DM Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: white;
  }
`
export const DateInput = styled(Input)`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  height: 40px;
  width: 27%;
  cursor: pointer;
`
export const AmountInput = styled(Input)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 27%
`
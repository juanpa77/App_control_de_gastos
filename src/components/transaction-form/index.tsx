import { ReactComponent as Send } from "../../asset/icons/send.svg";
import { formatDate } from "../../utility/formatDate"
import { Idb } from "../../utility/IDB"
import { Button } from "../buttons/styled";
import { Select } from "../select"
import { ToggleBtn } from "../buttons/toggle-btn"
import { AmountInput, DateInput, TextArea } from "./styled";
import useTransaction, { TransactionData } from "./useTransaction";

type Props = {
  db: Idb
  editTransaction: TransactionData
  openModal: () => void
}

const TransactionForm = ({ db, editTransaction, openModal }: Props) => {
  const {
    transaction,
    handleInputChange,
    sendTransaction,
  } = useTransaction({ db, openModal, editTransaction })

  return (
    <>
      <ToggleBtn />
      <AmountInput
        autoFocus
        type="number"
        placeholder="$999"
        value={transaction.amount}
        onChange={(e) => handleInputChange(e)}
        name="amount"
      />
      <DateInput
        type="date"
        defaultValue={transaction.date || formatDate(new Date())}
        onChange={(e) => handleInputChange(e)}
        name="date"
      />
      <Select
        handleInputChange={(e) => handleInputChange(e)}
        defaultCategory={transaction.category}
      />
      <TextArea
        placeholder="Ingrese una descripcion"
        onChange={(e) => handleInputChange(e)}
        name="description"
      />
      <Button
        type="submit"
        onClick={(e) => sendTransaction(transaction, e)}
      >
        <Send></Send>
        {editTransaction ? "Guardar" : "Agregar"}
      </Button>
    </>
  )
}

export default TransactionForm
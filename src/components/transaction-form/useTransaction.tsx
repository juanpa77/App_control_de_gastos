import { nanoid } from "nanoid";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { splitDate, formatDate } from "../../utility/formatDate";
import { Idb } from "../../utility/IDB";
import useToggle from "../toggle-btn/useToggle";

export interface TransactionData {
  id: string;
  type: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

type Props = {
  db: Idb
  isOpenModal: boolean
  openModal: () => void
}

type InputChange = ChangeEvent<
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLTextAreaElement
  | HTMLSelectElement
>

const useTransaction = ({ db, openModal, isOpenModal }: Props) => {
  const editTransactio = useLocation().state as TransactionData;
  const [toggle, triggerToggle] = useToggle()
  const [transaction, setTransaction] = useState<TransactionData>({
    id: editTransactio?.id || nanoid(10),
    type: editTransactio?.type || 'Expenses',
    amount: editTransactio?.amount || 0,
    date: editTransactio?.date,
    category: editTransactio?.category || "",
    description: editTransactio?.description || "",
  });
  db.openDB();
  useEffect(() => setTransaction({ ...transaction, type: toggle ? 'Income' : 'Expenses' }), [toggle])

  const sendTransaction = (transaction: TransactionData, ev: FormEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-unused-vars
    const [day, month] = splitDate(transaction.date);
    if (transaction.amount > 0) {
      editTransactio
        ? db.updateIncome({ store: month, data: transaction })
        : db.addIncome({ store: month, data: transaction });
      ev.currentTarget.form?.reset();
      openModal();
    }
  };

  const handleInputChange = (e: InputChange) => {
    setTransaction({
      ...transaction,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset();
    e.preventDefault();
  };

  useEffect(() => {
    if (!editTransactio) {
      setTransaction({
        id: nanoid(10),
        type: "Expenses",
        amount: 0,
        date: formatDate(new Date()),
        category: "",
        description: "",
      });
    }
  }, [isOpenModal]);

  return { onFormSubmit, triggerToggle, transaction, handleInputChange, sendTransaction, toggle, editTransactio }
}

export default useTransaction
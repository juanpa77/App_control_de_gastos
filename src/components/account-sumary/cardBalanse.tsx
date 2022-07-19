import { CardData } from "./cardData";
import { useEffect, useState } from "react";
import { Idb } from "../../utility/IDB";
import { formatNumber } from "../../utility/formatDate";

export const Balance = (props: { db: Idb; dateRanges: string }) => {
  const { dateRanges, db } = props;
  const currentMonth = "0" + (new Date().getMonth() + 1);

  const [totalIncome, setTotalIncome] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);

  const [available, setAvailable] = useState(0);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const calcAvailable = () => {
    if (dateRanges === "Mensual")
      setAvailable(totalIncome - monthExpenses - expenses);
    if (dateRanges === "Semanal")
      setAvailable(Math.round((totalIncome - monthExpenses) / 4 - expenses));
    if (dateRanges === "Diario")
      setAvailable(Math.round((totalIncome - monthExpenses) / 31 - expenses));
  };

  useEffect(() => {
    db.getFixedExpenses(currentMonth).then((res) => setMonthExpenses(res));
    db.getAmount(currentMonth, dateRanges, "Income").then((res) =>
      setIncome(res)
    );
    db.getAmount(currentMonth, "Mensual", "Income").then((res) =>
      setTotalIncome(res)
    );
    db.getAmount(currentMonth, dateRanges, "Expenses").then((res) =>
      setExpenses(res)
    );
    calcAvailable();
  }, [income, expenses, totalIncome]);

  return (
    <div className="cardBalance">
      <CardData
        name="containerAvailable"
        tipeData={"Disponible " + dateRanges}
        value={formatNumber(available)}
      />
      <div className="line"></div>
      <div className="containerTipeOfData">
        <CardData
          name="containerIcome"
          tipeData="Ingreso"
          value={formatNumber(income)}
        />
        <CardData
          name="containerExpense"
          tipeData="Gastos"
          value={formatNumber(expenses)}
        />
      </div>
    </div>
  );
};

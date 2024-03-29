import "./style/App.css";
import "./style/expenseLayut.css";
import "./components/transaction-list/transaction-list-itm.css";
import { Idb } from "./utility/IDB";

import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { TransactionListDb } from "./components/transaction-list/services/getTransactionList";
import { SuccessfulTransaction } from "./components/modal/Successful-transaction";
import { CategoryProvider } from "./context/categoryContext";
import { Config } from "./components/config";
import { AccountSumary } from "./views/account-sumary";
import NewTransaction from "./views/add-new-transaction";
import ShowTransactions from "./views/show-transactions";
import ProtectedRoute from "./routes/protectedRoute";
import Login from "./views/login";

function App() {
  const db = new Idb();

  return (
    <div className="App">
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route index element={<AccountSumary db={db} />} />
              <Route path="/config" element={<Config db={db} />} />
              <Route path="/transaction" element={<NewTransaction db={db} />} />
              <Route path="successful-transaction" element={<SuccessfulTransaction />} />
              <Route path="/transaction-list" element={<ShowTransactions db={new TransactionListDb(db)} />} />
            </Route>
          </Route>
        </Routes>
      </CategoryProvider>
    </div>
  );
}

export default App;

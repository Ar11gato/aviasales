import "./styles/global.scss";
import Header from "./components/Header/Header.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Sorter from "./components/Sorter/Sorter.tsx";
import PaginationButton from "./components/PaginationButton/PaginationButton.tsx";
import TicketList from "./components/TicketList/TicketList.tsx";

import { getFlights, getSearchId } from "./api/getSearchId.ts";
import { useEffect } from "react";
import { MyContextProvider } from "./hooks/MyContextProvider.tsx";

function App() {
  const { searchId } = getSearchId();
  const { flights } = getFlights(searchId);

  useEffect(() => {
    console.log(searchId);
  }, [searchId]);

  useEffect(() => {
    console.log(flights);
  }, [flights]);

  return (
    <>
      <MyContextProvider>
        <div className="app">
          <div className="container">
            <Header />
            <div className="content">
              <Sidebar />
              <div className="right">
                <Sorter />
                <TicketList />
                <PaginationButton />
              </div>
            </div>
          </div>
        </div>
      </MyContextProvider>
    </>
  );
}

export default App;

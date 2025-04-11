import "./styles/global.scss";
import Header from "./components/Header/Header.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Sorter from "./components/Sorter/Sorter.tsx";

import TicketList from "./components/TicketList/TicketList.tsx";

function App() {
  return (
    <>
      <div className="app">
        <div className="container">
          <Header />
          <div className="content">
            <Sidebar />
            <div className="right">
              <Sorter />
              <TicketList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useContext } from "react";
import MainPage from "./views/MainPage";
import { Context } from "./contexts/SessionContext";
import QrCodeScanner from "./views/QrCodeScanner";
import { ContactProvider } from "./contexts/ContactContext";

export default function App() {
  const {jid} = useContext(Context)
  return jid !== undefined ? (
    <ContactProvider>
      <MainPage />
    </ContactProvider>
  ) : <QrCodeScanner />
}


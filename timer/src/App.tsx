import "./App.css";
import { Temporal } from "@js-temporal/polyfill";


function App() {
  // const myTime = Temporal.PlainTime.from({ minute: 5 })
  // const formatted = `${myTime.minute.toString().padStart(2, "0")}:${myTime.second.toString().padStart(2, "0")}`;
  const start = Temporal.Now.instant();
  function calcuateDuration() {
    const end = Temporal.Now.instant()
    const duration = end.since(start)
    return (d)
  }
  return <>{myTime.toString()}
  </>;
}

export default App;

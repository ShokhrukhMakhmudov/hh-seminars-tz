import { useContext, useEffect, useState } from "react";
import Item from "./components/Item";
import { SeminarType } from "./types";
import Loader from "./components/Loader";
import { Context } from "./context";

function App() {
  const { loading, setLoading, refetchState } = useContext(Context);

  const [seminars, setSeminars] = useState<[] | SeminarType[]>([]);

  useEffect(() => {
    async function fetchSeminars() {
      setLoading(true);
      try {
        const req = await fetch("http://localhost:3000/seminars");
        if (!req.ok) {
          throw new Error("Something went wrong!");
        }

        const res = await req.json();

        setSeminars(res);
        setLoading(false);
      } catch (error) {
        alert("Something went wrong!");
      }

      setLoading(false);
    }

    fetchSeminars();
  }, [refetchState]);

  if (loading) return <Loader />;

  return (
    <section>
      <div className="container">
        <h1 className="text-center text-primary font-semibold text-3xl border-b-2 pb-4 mt-5">
          Seminars List
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center py-10">
          {seminars.map((seminar) => (
            <Item key={seminar.id} data={seminar} />
          ))}

          {seminars.length === 0 && (
            <h1 className="text-center text-primary font-semibold text-3xl border-b-2 pb-4 mt-5">
              No seminars found
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;

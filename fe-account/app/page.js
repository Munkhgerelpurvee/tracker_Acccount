"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [records, setRecords] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/record")
      .then((res) => res.json())
      .then((data) => {
        console.log("Where is Records Data", data);
        setRecords(data);
      });
  }, []);
  //
  useEffect(() => {
    fetch("http://localhost:4000/accounts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Where is ACCOUNTS Data", data);
        setAccounts(data);
      });
  }, []);

  //
  return (
    <main className="flex min-h-screen flex-col p-2 gap-4">
      <>
        {records.map((record) => {
          return (
            <>
              <div key={record.id}>
                {" "}
                {`№:${record.id} ${record.title}`}
                <br />
              </div>
              {/*  */}
            </>
          );
        })}

        <div>
          {accounts.map((item, index) => {
            return (
              <div key={item.name + index}>
                {item.name}
                {item.title}
              </div>
            );
          })}
        </div>
      </>
    </main>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  //
  const [records, setRecords] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/article")
      .then((res) => res.json())
      .then((data) => {
        console.log("Where is Records Data", data);
        setRecords(data);
      });
  }, []);

  //
  const [accounts, setAccounts] = useState([]);
  // Refresh хийхэд биш харин бичмэгч автоматаар орж ирдэг болгоё гэвэл нэг function дотор бичиж өгөөд харин дараа нь түүнийг useEffect дотор нэг удаа дуудаж авдаг болгоно.  Мөн function createNewAccount дотор дуудчих юм бол дахин шинэчлэгдэж орж ирэх байгаа.

  function loadAccount() {
    fetch("http://localhost:4000/accounts/list")
      .then((res) => res.json())
      .then((data) => {
        console.log("Where is ACCOUNTS LIST Data", data);
        setAccounts(data);
      });
  }
  useEffect(() => {
    loadAccount();
  }, []);

  function createNewAccount() {
    const name = prompt("Name...");
    const title = prompt("Title:");
    fetch(`http://localhost:4000/accounts/create?name=${name}&title=${title}`)
      .then((res) => res.json())
      .then(() => {
        loadAccount();
      });
  }

  //
  return (
    <main className="flex min-h-screen flex-col p-2 gap-4">
      <>
        {records.map((record) => {
          return (
            <>
              <div key={record.id} className="flex">
                {" "}
                <p className="bg-gray-200 gap-4 rounded-full">
                  {`№:${record.id}  ${record.title}`}
                </p>
                <br />
                <p className="bg-green-700 rounded-full">{record.name}</p>
                <br />
              </div>
              {/*  */}
            </>
          );
        })}
        {/* Одоо урд талаасаа мэдээллээ оруулдаг болно гэвэл яах вэ? Button хийж prompt-с утга авч болно. */}
        <div className="flex">
          <button
            onClick={createNewAccount}
            className="bg-blue-800 rounded-full px-4 text-white"
          >
            Add New
          </button>
        </div>
        <div className=" pr-4">
          {accounts.map((item, index) => {
            return (
              <div key={item.name + index} className="text-gray-600 gap-4 pr-4">
                <div>
                  {`Name:${item.name}`} {`Tiitle:${item.title}`}
                  <button className="bg-blue-800 rounded-full px-4 text-white">
                    Edit
                  </button>
                  <button className="bg-blue-800 rounded-full px-4 text-white">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </main>
  );
}

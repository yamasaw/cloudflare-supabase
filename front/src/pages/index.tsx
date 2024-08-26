import React, { useState } from "react";

const API_URL = "http://127.0.0.1:54321";

const callAPI = (path: string, method: string='GET',body: any={}) => {
  return fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).catch((e) => {
    console.error('api error', e);
  });
}


export default function Home() {
  const [path, setPath ] = useState('/login/');
  const [method, setMethod ] = useState('GET');
  const [body, setBody ] = useState('{}');

  const clickApiButton = () => {
    callAPI(path, method, body).then((res) => {
      console.log(res);
    });
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">example cloudflare-supabase</h1>
        <p className="text-2xl text-center mt-4">call function</p>
        <div>
          <div className="mt-4">
            <p>Path:</p>
            <input className="p-1.5 border border-gray-500 rounded-sm" type="text" value={path} onChange={(e) => setPath(e.target.value)} />
          </div>
          <div className="mt-4">
            <p>Method: </p>
            <select className="p-1.5 border border-gray-500 rounded-sm" value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="mt-4">
            <p>Body:</p>
            <textarea className="p-1.5 w-80 h-48 border border-gray-500 rounded-sm" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div className="mt-4">
            <button
              onClick={clickApiButton}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >call api</button>
          </div>
        </div>
      </div>
    </main>
  );
}

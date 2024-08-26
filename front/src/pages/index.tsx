import React, { useState } from "react";

const API_URL = "http://127.0.0.1:8787";

const callAPI = async (path: string, method: string='GET',data: string='{}') => {
  let body: string|undefined = undefined
  if (method === 'GET') {
  } else {
    body = data
  }

  return await fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body,
  }).catch((e) => {
    console.error('api error', e);
  });
}


export default function Home() {
  const [path, setPath ] = useState('/login/');
  const [method, setMethod ] = useState('GET');
  const [body, setBody ] = useState('{\n"email": "signup@example.com",\n"password": "password"\n}');
  const [response, setResponse ] = useState<any>();

  const clickApiButton = async () => {
    const res = await callAPI(path, method, body).then(async (res) => {
      setResponse(await res.json());
    })
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
          <div className="mt-4">
            <p>Response:</p>
            <textarea className="p-1.5 w-[1024px] h-96 border border-gray-500 rounded-sm" value={JSON.stringify(response)} />
          </div>
        </div>
      </div>
    </main>
  );
}

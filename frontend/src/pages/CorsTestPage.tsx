// src/pages/CorsTestPage.tsx
import React, { useState } from "react";

// Define a type for the fetch result
interface FetchResult {
  status: number;
  data: any;
  headers: [string, string][];
}

const CorsTestPage: React.FC = () => {
  // Default endpoint to test (update as needed)
  const [endpoint, setEndpoint] = useState<string>(
    "https://localhost:5000/INTEX"
  );
  const [method, setMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  const [result, setResult] = useState<FetchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setResult(null);
    setError(null);
    try {
      // Create a RequestInit object
      const options: RequestInit = {
        method: method,
        credentials: "include", // valid values: "omit" | "same-origin" | "include"
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Only add a body for methods other than GET if a body is provided
      if (method !== "GET" && body) {
        options.body = body;
      }

      const response = await fetch(endpoint, options);
      let data;
      try {
        data = await response.json();
      } catch {
        data = await response.text();
      }

      // Set the result with a known type
      setResult({
        status: response.status,
        data: data,
        headers: Array.from(response.headers.entries()),
      });
    } catch (err: any) {
      // If err is unknown, we cast it as 'any' or extract its message
      setError(err.message || "An unknown error occurred.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Endpoint Tester</h1>
      <div>
        <label>
          Endpoint URL:
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div>
        <label>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Request Body (for POST/PUT/PATCH, in JSON format):
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: "100%", height: "150px" }}
          />
        </label>
      </div>
      <button onClick={handleTest}>Send Request</button>
      <div style={{ marginTop: "1rem" }}>
        <h2>Result</h2>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {result && (
          <div>
            <p>Status: {result.status}</p>
            <h3>Headers:</h3>
            <pre>{JSON.stringify(result.headers, null, 2)}</pre>
            <h3>Data:</h3>
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorsTestPage;

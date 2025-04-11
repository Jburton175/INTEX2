import { useEffect } from "react";

const EmailLogger = () => {
  useEffect(() => {
    async function fetchAndLogEmail() {
      try {
        const response = await fetch(
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net/pingauth",
          {
            method: "GET",
            credentials: "include", // includes cookies, if needed
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch email:", response.status);
          return;
        }

        const data = await response.json();
        if (data.email) {
          console.log("Captured email:", data.email);
        } else {
          console.warn("No email property found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    }

    fetchAndLogEmail();
  }, []);

  // This component doesn't render any UI.
  return null;
};

export default EmailLogger;

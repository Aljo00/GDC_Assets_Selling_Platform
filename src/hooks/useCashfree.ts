import { useState, useEffect } from "react";

// Get the environment from Vite env variables (set in Vercel)
const isTestEnv = import.meta.env.VITE_CASHFREE_ENV === "TEST";
const sdkUrl = isTestEnv
  ? "https://sdk.cashfree.com/js/v3/cashfree.sandbox.js"
  : "https://sdk.cashfree.com/js/v3/cashfree.js";

// Define the Cashfree class type
declare global {
  interface Window {
    Cashfree: any;
  }
}

let cashfreeInstance: any = null;

export const useCashfree = () => {
  const [cashfree, setCashfree] = useState<any>(null);

  useEffect(() => {
    if (cashfreeInstance) {
      setCashfree(cashfreeInstance);
      return;
    }

    const script = document.createElement("script");
    script.src = sdkUrl;
    script.async = true;

    script.onload = () => {
      try {
        if (window.Cashfree) {
          cashfreeInstance = new window.Cashfree({
            mode: isTestEnv ? "sandbox" : "production",
          });
          setCashfree(cashfreeInstance);
        } else {
          console.error("Cashfree SDK failed to initialize.");
        }
      } catch (error) {
        console.error("Failed to initialize Cashfree:", error);
      }
    };

    script.onerror = () => {
      console.error("Cashfree SDK failed to load.");
    };

    document.body.appendChild(script);

    // Optional cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return cashfree;
};

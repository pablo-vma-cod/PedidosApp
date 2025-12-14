import { useState, useEffect } from "react";

export default function useLoading({ initial = true, delay = 500 } = {}) {
  const [loading, setLoading] = useState(initial);

  useEffect(() => {
    if (!initial) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [initial, delay]);

  return loading;
}

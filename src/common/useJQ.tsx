import { useState, useEffect } from 'react';

interface JQResult {
  result: string | null;
  error: string | null;
  loading: boolean;
}

const useJQ = (jqFilter: string, jsonCode: string): JQResult => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let jsonData;
        try {
          jsonData = JSON.parse(jsonCode);
        } catch (parseError) {
          console.log(`Invalid JSON format ${jsonCode}`);
          return;
        }

        const filter = cleanFilter(jqFilter);

        const response = await fetch('http://localhost:5002/jq', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ data: jsonData, filter }),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          setResult(JSON.stringify(jsonResponse));
        } else {
          const txt = await response.text();

          const errorRegex = /Error: (.+?)<br>/;
          const match = txt.match(errorRegex);

          if (match && match[1]) {
            const errorMessage = match[1].trim();
            setError(errorMessage);
          } else {
            setError('Error message not found.');
          }
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jqFilter, jsonCode]);

  return { result, error, loading };
};

function cleanFilter(text: string): string {
  return text.replace(/\n/g, ' ');
}

export default useJQ;

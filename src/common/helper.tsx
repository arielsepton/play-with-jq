import useFetch from './useFetch';

export interface MyJson {
  [key: string]: any;
}

export async function runJQ(jqFilter: string, data: object): Promise<string> {
  try {
    console.log('hiii');
    const filter = cleanFilter(jqFilter);

    // useFetch('http://localhost:5002/jq', 'POST', [], JSON.stringify({ data, filter }))
    const response = await fetch('http://localhost:5002/jq', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ data, filter }),
    });

    if (response.ok) {
      return JSON.stringify(await response.json());
    } else {
      const txt = await response.text();

      // Regular expression to extract the error message
      const errorRegex = /Error: (.+?)<br>/; // Use non-greedy matching to capture only the main error message
      const match = txt.match(errorRegex);

      if (match && match[1]) {
        const errorMessage = match[1].trim();
        return errorMessage;
      } else {
        return 'Error message not found.';
      }
    }
  } catch (error) {
    console.log('hi');
    return error;
  }
}

function cleanFilter(text: string): string {
  // Replace newline characters with a space
  return text.replace(/\n/g, ' ');
}

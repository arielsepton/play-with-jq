export interface MyJson {
  [key: string]: any;
}

export async function runJQ(jqFilter: string, jsonInput: string): Promise<string> {
  const filter = cleanFilter(jqFilter)
  
  const data: MyJson = JSON.parse(jsonInput);
  const response = await fetch('/jq', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({data, filter})
  });

  return JSON.stringify(await(response).json())
}

function cleanFilter(text: string): string {
  // Replace newline characters with a space
  return text.replace(/\n/g, ' ');
}

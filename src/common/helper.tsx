import jq from 'jq-in-the-browser';

export interface MyJson {
  [key: string]: any;
}

export function runJQ(jqFilter: string, jsonInput: string): any {
  const filter = cleanFilter(jqFilter)
  const query = jq(filter);
  const jsonData: MyJson = JSON.parse(jsonInput);

  return query(jsonData);
}

function cleanFilter(text: string): string {
  // Replace newline characters with a space
  return text.replace(/\n/g, ' ');
}

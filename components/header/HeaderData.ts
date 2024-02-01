interface HeaderData {
  name: string
}

const stringToHeaderData = (data: string): HeaderData => {
  const headerData: HeaderData = JSON.parse(data);
  return headerData;
}

const headerDataToString = (headerData: HeaderData): string => {
  const data: string = JSON.stringify(headerData);
  return data;
}
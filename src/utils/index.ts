import { omitBy, keyBy, isBoolean, isNumber, isEmpty } from 'lodash-es';

/**
 * Remove key with empty value from object
 * + let obj = { a: '3', b: '4', c: 0, d: '0', e: '', f: false, g: undefined, h: null, i: [], k: {} }
 * + removeEmptyValues(obj)
 * + ==> { a: '3', b: '4', c: 0, d: '0' }
 * @param formData object T
 * @returns object Partial(T)
 */
export const removeEmptyValues = <T extends Object>(formData: T) => {
  return omitBy(formData, (cur: any) => {
    if (isBoolean(cur) || isNumber(cur)) return false;

    return isEmpty(cur);
  });
};

/**
 * Get color by status value
 * + let options = [{ value: 1, label: 'All' }, { value: 2, label: 'Submitted' }]
 * + mappingOptionArrayToObject(options) ==> { 1: 'All' }, { 2: 'Submitted' }
 * @param options IOptions - array option - { value, label }[]
 * @returns object from array key by 'value' - { [value]: label }
 */
export const mappingOptionArrayToObject = (options: IOptions) => {
  return keyBy(options, 'value');
};

/**
 * Download excel file
 * + downloadExcelFile(responseData, 'TMS_Report_yyyymmddhhmmss.xlsx')
 * @param responseData string
 * @param fileName string
 */
export const downloadExcelFile = (responseData: string, fileName: string) => {
  try {
    const link = document.createElement('a');

    link.href = URL.createObjectURL(
      new Blob([responseData], {
        type: 'application/vnd.ms-excel',
      }),
    );
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {}
};

/**
 * Get the size of file in KB
 * + getFileSizeKB(file)
 * @param file string | File
 * @param fileName string
 * @returns string size of file format '{size} KB'
 */
export const getFileSizeKB = (file: string | File) => {
  const { size } = new File([file], '');

  return `${(size / 1000).toFixed(3)} KB`;
};

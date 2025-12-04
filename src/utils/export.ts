import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export interface ExportRow {
  [key: string]: string | number | boolean | null | undefined
}

export function exportToXLSX(rows: ExportRow[], filename: string) {
  if (!rows.length) return
  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  })
  saveAs(blob, filename)
}



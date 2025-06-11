import { useTranslation } from 'react-i18next'

export const toFullName = (lastName: string, middleName: string, firstName: string, language: string) => {
  if (language === 'vi') {
    return `${lastName || ''} ${middleName || ''} ${firstName || ''}`.trim()
  }
  return `${firstName || ''} ${middleName || ''} ${lastName || ''}`.trim()
}

export const convertBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const separationFullName = (fullName: string, language: string) => {
  const result = {
    firstName: '',
    middleName: '',
    lastName: ''
  }
  if (language === 'vi') {
    const arrFullname = fullName.trim().split(' ')?.filter(Boolean)
    if (arrFullname.length === 1) {
      if (language === 'vi') {
        result.firstName = arrFullname.join()
      } else if (language === 'en') {
        result.lastName = arrFullname.join()
      }
    } else if (arrFullname.length === 2) {
      if (language === 'vi') {
        result.lastName = arrFullname[0]
        result.firstName = arrFullname[1]
      } else if (language === 'en') {
        result.firstName = arrFullname[1]
        result.lastName = arrFullname[0]
      }
    } else if (arrFullname.length >= 3) {
      if (language === 'vi') {
        result.lastName = arrFullname[0]
        result.middleName = arrFullname.slice(1, arrFullname.length - 1).join(' ')
        result.firstName = arrFullname[arrFullname.length - 1]
      } else if (language === 'en') {
        result.lastName = arrFullname[arrFullname.length - 1]
        result.middleName = arrFullname.slice(1, arrFullname.length - 1).join(' ')
        result.firstName = arrFullname[0]
      }
    }
  }
  return result
}

export const getAllValueOfObject = (obj: any, arrExlude?: string[]) => {
  try {
    const values: any[] = []
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        values.push(...getAllValueOfObject(obj[key], arrExlude))
      } else {
        if (!arrExlude?.includes(obj[key])) {
          values.push(obj[key])
        }
      }
    }
    return values
  } catch (error) {
    return []
  }
}

export const formatDate = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value))
}

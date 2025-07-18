import validator from 'validator';

export function isString(data: string) {
  if (!data) return false;
  const regexName = /^[a-zA-Z]+$/;
  if (data.match(regexName)) {
    return true;
  } else {
    return false;
  }
}

export function isEmail(data: string) {
  if (!data) return false;
  if (validator.isEmail(data)) {
    return true;
  } else {
    return false;
  }
}

export function isPhoneNumber(data: string) {
  if (!data) return false;

  if (validator.isMobilePhone(data)) {
    return true;
  } else {
    return false;
  }
}

export function isPassword(data: string) {
  if (!data) return false;
  if (
    validator.isStrongPassword(data, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return true;
  } else {
    return false;
  }
}

export function isIFSC(data: string) {
  if (!data) return false;
  if (
    validator.isStrongPassword(data, {
      minLength: 7,
      minLowercase: 4,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
  ) {
    return true;
  } else {
    return false;
  }
}

export const validateEmail = (email: string) => {
  // Basic email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validateAddress = (address: string) => {
  // Regular expression to match special characters
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  // Check if the address contains any special characters
  if (specialCharsRegex.test(address)) {
    return false; // Address contains special characters
  } else {
    return true; // Address is valid
  }
};

export const validateAccountNumber = (accountNumber: string) => {
  // Regular expression to match only digits
  const digitsRegex = /^\d+$/;

  // Check if the account number consists of only digits
  if (!digitsRegex.test(accountNumber)) {
    return false; // Account number contains non-digit characters
  }
  // Additional validation rules can be added here based on specific requirements

  return true; // Account number is valid
};

export const validatePhoneNumber = (phoneNumber: any) => {
  // Regular expression to match a typical international phone number format
  const phoneRegex = /^(\+)?\d+$/;

  // Check if the phone number matches the expected format
  if (!phoneRegex.test(phoneNumber)) {
    return false; // Phone number format is not valid
  }

  return true; // Phone number is valid
};

export // Formatting function to format number as 'XX XXX XXXX'
const formatPhoneNumber = (phoneNumber: string) => {
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D+/g, "");
  
  // Limit to 9 digits (if that's what you want)
  const trimmed = cleaned.slice(0, 9);

  // Format the number as 'XX XXX XXXX'
  let formatted = trimmed;
  // Add first group (XX)
  if (trimmed.length >= 2) {
    formatted = trimmed.slice(0, 2) + (trimmed.length > 2 ? " " : "");
     // Add second group (XXX)
    if (trimmed.length >= 5) {
      formatted += trimmed.slice(2, 5) + (trimmed.length > 5 ? " " : "");
      // Add third group (XXXX)
      if (trimmed.length > 5) {
        formatted += trimmed.slice(5);
      }
    } else {
      formatted += trimmed.slice(2);
    }
  }
  // console.log('Final formatted number:', formatted);
  // console.log('Number of digits:', cleaned.length);
  // console.log('Total length (including spaces):', formatted.length);
  // console.log('------------------------');

  return formatted;    
};

// Function to validate bank code
export const validateBankCode = (bankCode: any) => {
  // Regular expression to match bank code format (example: 4 digits)
  const bankCodeRegex = /^\d{4}$/;

  // Check if the bank code matches the expected format
  return bankCodeRegex.test(bankCode);
};

// Function to validate SWIFT code
export const validateSWIFTCode = (swiftCode: any) => {
  // Regular expression to match SWIFT code format
  const swiftCodeRegex = /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/;

  // Check if the SWIFT code matches the expected format
  return swiftCodeRegex.test(swiftCode);
};

// Example usage:
// const bankCode = "1234"; // Example bank code
// const swiftCode = "ABCDUS33"; // Example SWIFT code

// need to be alow only alphabets number and space
export const validateCharacters = (address: string) => {
  // Regular expression to match special characters
  const specialCharsRegex = /^[a-zA-Z0-9 ]*$/;

  // Check if the address contains any special characters
  if (specialCharsRegex.test(address)) {
    return true; // Address contains special characters
  } else {
    return false; // Address is valid
  }
};

export const validateLength = (value: string, min: number, max: number) => {
  // Check if the length of the value is within the specified range
  if (value.length >= min && value.length <= max) {
    return true; // Value length is valid
  } else {
    return false; // Value length is not valid
  }
};

export const validateContactNumber = (value: string) => {
  const regex = /^[0-9]{9,10}$/;
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const validateAddress2 = (value: string) => {
  const regex = /^[a-zA-Z0-9,./ ]*$/;
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const validateNumeric = (value: string) => {
  const regex = /^[0-9]*$/;
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
};

import { useState } from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    handleInputChange,
    setValue,
  };
}

export default useInput;

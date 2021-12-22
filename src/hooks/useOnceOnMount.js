import { useEffect } from 'react';

const useOnceOnMount = (callback) => { // Создание пользовательского хука
  useEffect(callback, []);
};

export default useOnceOnMount;
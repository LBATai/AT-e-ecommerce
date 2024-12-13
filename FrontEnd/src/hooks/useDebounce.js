import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('')
    useEffect(() => {
        const handle = setTimeout(() =>{
            setValueDebounce(value)
        }, delay)
        return () => clearTimeout(handle)
    }, [value]);
    // console.log('valueDebounce', valueDebounce)
    return valueDebounce;
}
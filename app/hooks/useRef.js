// useRefs.js
import { useRef } from 'react';

const useRefs = () => {
    const refs = useRef({
        scrollView: null,
        inputs: {
            email: null,
            password: null,
            fullName: null,
        },
    }).current;

    // Hàm cuộn đến input
    const scrollToInput = (inputRef) => {
        if (!inputRef || !refs.scrollView) {
            console.log("Không thể cuộn: inputRef hoặc scrollView chưa được định nghĩa!");
            return;
        }

        inputRef.measureLayout(
            refs.scrollView,
            (x, y) => {
                refs.scrollView.scrollTo({ y: y - 50, animated: true });
            },
            () => console.log("Không thể đo layout của input")
        );
    };

    return { refs, scrollToInput };
};

export default useRefs;
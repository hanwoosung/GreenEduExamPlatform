import {useState} from "react";

// 세션 스토리지를 관리하는 커스텀 훅
const useSessionStorage = () => {

    // 상태 관리: 세션 스토리지의 모든 값을 가져와 상태에 저장
    const getSessionValues = () => {
        return Object.entries(sessionStorage).reduce((acc, [key, value]) => {
            try {
                acc[key] = JSON.parse(value); // JSON 형식으로 파싱
            } catch (e) {
                console.error(`Error parsing sessionStorage key "${key}":`, e);
                acc[key] = value; // JSON 파싱 실패 시 원본 값을 저장
            }
            return acc;
        }, {});
    };

    const [sessionValues, setValues] = useState(getSessionValues());

    // 세션 스토리지에 값 저장 (추가)
    const setSession = (key, value) => {
        if (key && value) {
            sessionStorage.setItem(key, JSON.stringify(value));

            setValues((prev) => ({
                ...prev,
                [key]: value, // 상태 업데이트
            }));
        }
    };

    // 세션 스토리지에서 특정 값 삭제
    const removeSession = (key) => {
        if (key) {
            sessionStorage.removeItem(key);

            setValues((prev) => {
                const {[key]: _, ...rest} = prev; // 상태에서 해당 키 제거
                return rest;
            });
        }
    };

    // 세션 스토리지에서 특정 값 가져오기
    const getSession = (key) => {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    return {sessionValues, setSession, removeSession, getSession};
};

export default useSessionStorage;

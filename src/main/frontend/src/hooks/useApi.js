import { useState } from "react";
import axios from "axios";

const useApi = (baseUrl, initialConfig = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        baseURL: "http://192.168.0.224:8080",
    });
    const request = async (url, method, payload = null, config = {}) => {
        setLoading(true);
        setError(null);

        try {
            // URL 중복 방지 로직 추가
            const fullUrl = url?.startsWith("/") ? url : `${baseUrl}${url || ""}`;
            console.log(`요청: ${method.toUpperCase()} ${fullUrl}`, payload);

            const response = await axiosInstance({
                url: fullUrl,
                method,
                ...(method !== "get" && method !== "delete" ? { data: payload } : {}),
                ...initialConfig,
                ...config,
            });

            console.log(`응답: ${method.toUpperCase()} ${fullUrl}`, response.data);
            setData(response.data);
            return response.data;
        } catch (e) {
            console.error(`에러: ${method.toUpperCase()} ${url || baseUrl}`, e.message);
            setError(e.message || `${method.toUpperCase()} 요청 중 문제가 발생했습니다.`);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        get: (id, config, url = null) => request(url ? `${url}/${id}` : `${baseUrl}/${id}`, "get", null, config),
        post: (payload, config, url = null) => request(url, "post", payload, config),
        put: (payload, config, url = null) => request(url, "put", payload, config),
        del: (id, config, url = null) => request(url ? `${url}/${id}` : `${baseUrl}/${id}`, "delete", null, config),
    };
};

export default useApi;

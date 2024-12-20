import {useState} from "react";
import axios from "axios";


/**
 * const { get, post, put, del, loading, error } = useApi2(); << 여기서 필요없는건 제거 하고 사용 그리고 베이스 url 안받음
 * 사용 방법 : 이거보고 이제 묻지마셈 
 * 1. GET 요청
 *    await get("/api/v1/example", {
 *        params: { key: "value" },
 *        headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 *
 * 2. POST 요청
 *    await post("/api/v1/example", {
 *        body: { key: "value", key: "value" },
 *        headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 *
 * 3. PUT 요청
 *    await put("/api/v1/example/1", {
 *        body: {key: "value" },
 *       headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 *
 * 4. DELETE 요청
 *    await del("/api/v1/example/1", {
 *        headers: { 뭐 토큰이나 json타입같은거 : "값" }
 *    });
 */
const useApi2 = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        baseURL: "http://192.168.0.224:8080"
    });

    const request = async (method, url, {params = {}, body = {}, headers = {}} = {}) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`요청값들 전부 : ${method.toUpperCase()} ${url}`, {params, body});

            const response = await axiosInstance({
                method,
                url,
                params,
                data: body,
                headers,
            });

            console.log(`응답값들 전부 :  ${method.toUpperCase()} ${url}`, response.data);
            return response.data.body;

        } catch (err) {
            console.error(`에잉 에러 ${method.toUpperCase()} ${url}`, err.response || err.message);
            setError(err.response?.data?.message || "오류");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const get = (url, options = {}) => request("get", url, options);
    const post = (url, options = {}) => request("post", url, options);
    const put = (url, options = {}) => request("put", url, options);
    const del = (url, options = {}) => request("delete", url, options);

    return {
        loading,
        error,
        get,
        post,
        put,
        del,
    };
};

export default useApi2;

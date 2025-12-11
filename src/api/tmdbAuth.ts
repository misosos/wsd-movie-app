import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export async function validateTmdbApiKey(apiKey: string): Promise<boolean> {
    try {
        // 아주 가벼운 GET 하나로 키 유효성만 확인
        const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: {
                api_key: apiKey,
                language: "ko-KR",
                page: 1,
            },
        });
        return res.status === 200;
    } catch {
        // 401, 403 등 나오면 false
        return false;
    }
}
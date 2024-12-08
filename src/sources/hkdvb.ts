import { replace_github_raw_proxy_url, collectM3uSource } from "../utils"
import { handle_m3u, type TSources, converter, ISource } from "./utils"

export const hkdvb_filter: ISource["filter"] = (
    raw,
    caller,
    collectFn
): [string, number] => {
    const rawArray = handle_m3u(replace_github_raw_proxy_url(raw))

    if (caller === "normal" && collectFn) {
        for (let i = 1; i < rawArray.length; i += 2) {
            collectM3uSource(rawArray[i], rawArray[i + 1], collectFn)
        }
    }

    return [converter(rawArray.join("\n")), (rawArray.length - 1) / 2]
}

export const yang_m3u_sources: TSources = [
    {
        name: "HKDVB",
        f_name: "hkdvb",
        url: "https://live.hkdvb.com/hls/playlist.m3u?token=397579992180253",
        filter: hkdvb_filter,
    },
]

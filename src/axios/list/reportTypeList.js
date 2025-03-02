import requests
    from "@/axios/axios";
export let reportTypeList = (data) => {
    return requests.get(`/api/officialWebsite/reportTypeListPC?${new URLSearchParams(data)}`)
}

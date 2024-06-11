
export const useApi = async (url, options) => {
	const csrf = useCookie("XSRF-TOKEN");
	const config = useRuntimeConfig()
	const token =  window.localStorage.getItem("token")
	

	let headers = {};
  

	if (csrf.value) {
		headers = {
			"X-XSRF-TOKEN": csrf.value,
		};
	}

	

	if(process.server) {
		headers = {
			...headers,
			...useRequestHeaders(["referer", "cookie"]),
		}
	}

	if(token){
		return await useFetch(config.public.localURL + url, {
			credentials: "include",
			...options,
			headers: {
				...headers,
				// "Content-Type": "application/json",
				'Accept': 'application/json',
				// 'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Expose-Headers': '*',
				'Authorization' : `Bearer ${token}`
			},
		}, {server : true});
	}else{
		return await useFetch(config.public.localURL + url, {
			credentials: "include",
			...options,
			headers: {
				...headers,
				// "Content-Type": "application/json",
				'Accept': 'application/json',
				// 'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Expose-Headers': '*',
			},
		}, {server : true});
	}


	
};

export const clearLogin = async () => {
	const token = useCookie("XSRF-TOKEN");
	token.value = null;
	const auth = useCookie("auth");
	auth.value = null;
	return navigateTo("/login");
};

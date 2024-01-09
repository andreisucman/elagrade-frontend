type Props<T> = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: T | FormData;
  router?: any;
};

const callTheServer = async <T>({ endpoint, method, body }: Props<T>) => {
  try {
    const isFormData = body instanceof FormData;
    const headers: HeadersInit = isFormData
      ? {}
      : { "Content-Type": "application/json" };

    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: "include",
    };

    if (body && method !== "GET") {
      fetchOptions.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`,
      fetchOptions
    );

    const data = await response.json();

    if (response.status === 401) {
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/sign-in" &&
        window.location.pathname !== "/sign-up" &&
        window.location.pathname !== "/pricing"
      ) {
        const searchParams = new URLSearchParams(window.location.search);

        searchParams.size > 0
          ? (window.location.href = `/sign-in?${searchParams.toString()}`)
          : (window.location.href = `/sign-in`);
      }
    }

    return { status: response.status, message: data.message };
  } catch (err: any) {
    console.log("Error:", err.message);
  }
};

export default callTheServer;

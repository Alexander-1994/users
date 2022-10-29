const Service = () => {
    const _urlPath = 'https://reqres.in/api/users';

    const getData = async (url) => {
		const result = await fetch(url);

		if (!result.ok) {
			throw new Error('ERROR');
		}

		return await result.json();
	};

    const getPersons = async () => {
        const result = await getData(_urlPath);

        return await result.data;
    };

    return {
        getPersons
    };
}

export default Service;
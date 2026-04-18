import { getMeta, getAllVendors } from '$lib/data/index.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = () => {
	return {
		meta: getMeta(),
		vendors: getAllVendors()
	};
};
